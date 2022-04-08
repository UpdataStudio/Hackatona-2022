CREATE SCHEMA hackathona AUTHORIZATION postgres;

-- hackathona.dim_ubs definition
CREATE TABLE hackathona.dim_ubs (
	pk_ubs_cnes int4 NOT NULL,
	ds_regiao varchar NULL,
	tp_estabelecimento varchar NULL,
	nm_estabelecimento varchar NULL,
	ds_endereco varchar NULL,
	ds_complemento varchar NULL,
	nu_numero varchar NULL,
	ds_regiao_administrativa varchar NULL,
	CONSTRAINT dim_ubs_pk PRIMARY KEY (pk_ubs_cnes)
);
CREATE INDEX dim_ubs_pk_ubs_cnes_idx ON hackathona.dim_ubs USING btree (pk_ubs_cnes, nm_estabelecimento);

-- hackathona.fat_casos_covid definition
CREATE TABLE hackathona.fat_casos_covid (
	pk_casos_covid serial4 NOT NULL,
	sk_ubs_cnes int4 NOT NULL,
	ds_mes varchar NOT NULL,
	ds_casos varchar NULL,
	ds_faixa_etaria varchar NULL,
	qt_total_casos int4 NULL,
	qt_novos_casos int4 NULL,
	tx_sintomas_leves numeric NULL,
	tx_sintomas_graves numeric NULL,
	tx_assintomaticos numeric NULL,
	tx_homens numeric NULL,
	tx_mulheres numeric NULL,
	ds_comorbidades varchar NULL,
	ds_vacinados varchar NULL,
	tx_vacinados_em_acompanhamento numeric NULL,
	tx_vacinados_internados numeric NULL,
	tx_vacinados_confirmados numeric NULL,
	tx_comorbidades_em_acompanhamento numeric NULL,
	tx_comorbidades_internados numeric NULL,
	tx_comorbidades_confirmados numeric NULL,
	CONSTRAINT fat_casos_covid_pk PRIMARY KEY (pk_casos_covid)
);
CREATE INDEX fat_casos_covid_sk_ubs_cnes_idx ON hackathona.fat_casos_covid USING btree (sk_ubs_cnes, ds_mes, ds_casos);

-- hackathona.fat_obitos definition
CREATE TABLE hackathona.fat_obitos (
	pk_obitos serial4 NOT NULL,
	sk_ubs_cnes int4 NOT NULL,
	ds_mes varchar NOT NULL,
	ds_vacinados varchar NULL,
	ds_comorbidades varchar NULL,
	qt_total_obitos int4 NULL,
	qt_novos_obitos int4 NULL,
	tx_letalidade numeric NULL,
	tx_mortalidade numeric NULL,
	CONSTRAINT fat_obitos_pk PRIMARY KEY (pk_obitos)
);
CREATE INDEX fat_obitos_sk_ubs_cnes_idx ON hackathona.fat_obitos USING btree (sk_ubs_cnes, ds_mes, ds_vacinados, ds_comorbidades);

-- hackathona.fat_testagem definition
CREATE TABLE hackathona.fat_testagem (
	pk_testagem serial4 NOT NULL,
	sk_ubs_cnes int4 NOT NULL,
	ds_mes varchar NOT NULL,
	tp_teste varchar NULL,
	qt_testes_realizados int4 NULL,
	tx_negativos numeric NULL,
	tx_positivos numeric NULL,
	tx_com_sintomas numeric NULL,
	tx_sem_sintomas numeric NULL,
	tx_novo_teste numeric NULL,
	CONSTRAINT fat_testagem_pk PRIMARY KEY (pk_testagem)
);
CREATE INDEX fat_testagem_sk_ubs_cnes_idx ON hackathona.fat_testagem USING btree (sk_ubs_cnes, ds_mes, tp_teste);

-- hackathona.fat_vacinas definition
CREATE TABLE hackathona.fat_vacinas (
	pk_vacinas serial4 NOT NULL,
	sk_ubs_cnes int4 NOT NULL,
	ds_mes varchar NOT NULL,
	ds_dose varchar NULL,
	tx_dose numeric NULL,
	qt_aplicada int4 NULL,
	qt_estoque int4 NULL,
	ds_acima_12_anos varchar NULL,
	ds_fabricante varchar NULL,
	CONSTRAINT fat_vacinas_pk PRIMARY KEY (pk_vacinas)
);
CREATE INDEX fat_vacinas_sk_ubs_cnes_idx ON hackathona.fat_vacinas USING btree (sk_ubs_cnes, ds_mes, ds_dose, ds_acima_12_anos, ds_fabricante);

-- hackathona.vw_casos_covid source
CREATE OR REPLACE VIEW hackathona.vw_casos_covid
AS SELECT ubs.pk_ubs_cnes,
    ubs.ds_regiao,
    ubs.tp_estabelecimento,
    ubs.nm_estabelecimento,
    ubs.ds_endereco,
    ubs.ds_complemento,
    ubs.nu_numero,
    ubs.ds_regiao_administrativa,
    cov.ds_mes,
    cov.ds_casos,
    cov.ds_faixa_etaria,
    cov.ds_comorbidades,
    cov.ds_vacinados,
    cov.qt_total_casos,
    cov.qt_novos_casos,
    cov.tx_sintomas_leves,
    cov.tx_sintomas_graves,
    cov.tx_assintomaticos,
    cov.tx_homens,
    cov.tx_mulheres,
    cov.tx_vacinados_em_acompanhamento,
    cov.tx_vacinados_internados,
    cov.tx_vacinados_confirmados,
    cov.tx_comorbidades_em_acompanhamento,
    cov.tx_comorbidades_internados,
    cov.tx_comorbidades_confirmados
   FROM hackathona.dim_ubs ubs
     JOIN hackathona.fat_casos_covid cov ON ubs.pk_ubs_cnes = cov.sk_ubs_cnes;
     
-- hackathona.vw_obitos source
CREATE OR REPLACE VIEW hackathona.vw_obitos
AS SELECT ubs.pk_ubs_cnes,
    ubs.ds_regiao,
    ubs.tp_estabelecimento,
    ubs.nm_estabelecimento,
    ubs.ds_endereco,
    ubs.ds_complemento,
    ubs.nu_numero,
    ubs.ds_regiao_administrativa,
    obt.ds_mes,
    obt.ds_vacinados,
    obt.ds_comorbidades,
    obt.qt_total_obitos,
    obt.qt_novos_obitos,
    obt.tx_letalidade,
    obt.tx_mortalidade,
    obt.tx_obitos
   FROM hackathona.dim_ubs ubs
     LEFT JOIN ( SELECT t1.pk_obitos,
            t1.sk_ubs_cnes,
            t1.ds_mes,
            t1.ds_vacinados,
            t1.ds_comorbidades,
            t1.qt_total_obitos,
            t1.qt_novos_obitos,
            t1.tx_letalidade,
            t1.tx_mortalidade,
            round(t1.qt_total_obitos::numeric / t2.qt_total_geral_obitos::numeric, 2) AS tx_obitos
           FROM hackathona.fat_obitos t1
             LEFT JOIN ( SELECT fat_obitos.sk_ubs_cnes,
                    fat_obitos.ds_mes,
                    fat_obitos.ds_comorbidades,
                    sum(fat_obitos.qt_total_obitos) AS qt_total_geral_obitos
                   FROM hackathona.fat_obitos
                  GROUP BY fat_obitos.sk_ubs_cnes, fat_obitos.ds_mes, fat_obitos.ds_comorbidades) t2 ON t1.sk_ubs_cnes = t2.sk_ubs_cnes AND t1.ds_mes::text = t2.ds_mes::text AND t1.ds_comorbidades::text = t2.ds_comorbidades::text) obt ON ubs.pk_ubs_cnes = obt.sk_ubs_cnes;
                  
-- hackathona.vw_testagem source
CREATE OR REPLACE VIEW hackathona.vw_testagem
AS SELECT ubs.pk_ubs_cnes,
    ubs.ds_regiao,
    ubs.tp_estabelecimento,
    ubs.nm_estabelecimento,
    ubs.ds_endereco,
    ubs.ds_complemento,
    ubs.nu_numero,
    ubs.ds_regiao_administrativa,
    ttg.ds_mes,
    ttg.tp_teste,
    ttg.qt_testes_realizados,
    ttg.tx_negativos,
    ttg.tx_positivos,
    ttg.tx_com_sintomas,
    ttg.tx_sem_sintomas,
    ttg.tx_novo_teste
   FROM hackathona.dim_ubs ubs
     JOIN hackathona.fat_testagem ttg ON ubs.pk_ubs_cnes = ttg.sk_ubs_cnes;
     
-- hackathona.vw_vacinas source
CREATE OR REPLACE VIEW hackathona.vw_vacinas
AS SELECT ubs.pk_ubs_cnes,
    ubs.ds_regiao,
    ubs.tp_estabelecimento,
    ubs.nm_estabelecimento,
    ubs.ds_endereco,
    ubs.ds_complemento,
    ubs.nu_numero,
    ubs.ds_regiao_administrativa,
    vac.ds_mes,
    vac.ds_dose,
    vac.tx_dose,
    vac.qt_aplicada,
    vac.qt_estoque,
    vac.ds_acima_12_anos,
    vac.ds_fabricante
   FROM hackathona.dim_ubs ubs
     JOIN hackathona.fat_vacinas vac ON ubs.pk_ubs_cnes = vac.sk_ubs_cnes;
