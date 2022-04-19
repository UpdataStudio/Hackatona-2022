-- hackathona.dim_filtros definition

-- Drop table

-- DROP TABLE hackathona.dim_filtros;

CREATE TABLE hackathona.dim_filtros (
	id serial4 NOT NULL,
	regiao_saude varchar NULL,
	regiao_administrativa varchar NULL,
	bairro varchar NULL,
	ubs varchar NULL,
	CONSTRAINT dim_filtros_pkey PRIMARY KEY (id)
);
CREATE INDEX dim_filtros_regiao_saude_idx ON hackathona.dim_filtros USING btree (regiao_saude, regiao_administrativa, bairro, ubs);
CREATE UNIQUE INDEX dim_filtros_ubs_idx ON hackathona.dim_filtros USING btree (ubs);


-- hackathona.dim_ubs definition

-- Drop table

-- DROP TABLE hackathona.dim_ubs;

CREATE TABLE hackathona.dim_ubs (
	pk_ubs_cnes int4 NOT NULL,
	ds_regiao varchar(20) NULL,
	tp_estabelecimento bpchar(3) NULL,
	nm_estabelecimento varchar(40) NULL,
	ds_endereco varchar(70) NULL,
	ds_complemento varchar(30) NULL,
	nu_numero bpchar(5) NULL,
	ds_regiao_administrativa varchar(25) NULL,
	ds_bairro varchar(25) NULL,
	co_lat numeric NULL,
	co_lon numeric NULL,
	CONSTRAINT dim_ubs_pk PRIMARY KEY (pk_ubs_cnes)
);
CREATE INDEX dim_ubs_ds_bairro_idx ON hackathona.dim_ubs USING btree (ds_bairro);
CREATE INDEX dim_ubs_ds_regiao_idx ON hackathona.dim_ubs USING btree (ds_regiao, nm_estabelecimento, ds_regiao_administrativa);
CREATE INDEX dim_ubs_pk_ubs_cnes_idx ON hackathona.dim_ubs USING btree (pk_ubs_cnes);


-- hackathona.fat_casos_covid definition

-- Drop table

-- DROP TABLE hackathona.fat_casos_covid;

CREATE TABLE hackathona.fat_casos_covid (
	pk_casos_covid serial4 NOT NULL,
	sk_ubs_cnes int4 NOT NULL,
	ds_mes date NOT NULL,
	ds_casos varchar(15) NULL,
	ds_faixa_etaria bpchar(7) NULL,
	qt_total_casos int2 NULL,
	qt_novos_casos int2 NULL,
	tx_sintomas_leves numeric(4, 2) NULL,
	tx_sintomas_graves numeric(4, 2) NULL,
	tx_assintomaticos numeric(4, 2) NULL,
	tx_homens numeric(4, 2) NULL,
	tx_mulheres numeric(4, 2) NULL,
	ds_comorbidades varchar(45) NULL,
	ds_vacinados bpchar(3) NULL,
	tx_vacinados_em_acompanhamento numeric(4, 2) NULL,
	tx_vacinados_internados numeric(4, 2) NULL,
	tx_vacinados_confirmados numeric(4, 2) NULL,
	tx_comorbidades_em_acompanhamento numeric(4, 2) NULL,
	tx_comorbidades_internados numeric(4, 2) NULL,
	tx_comorbidades_confirmados numeric(4, 2) NULL,
	CONSTRAINT fat_casos_covid_pk PRIMARY KEY (pk_casos_covid),
	CONSTRAINT fat_casos_covid_fk FOREIGN KEY (sk_ubs_cnes) REFERENCES hackathona.dim_ubs(pk_ubs_cnes)
);
CREATE INDEX fat_casos_covid_ds_comorbidades_idx ON hackathona.fat_casos_covid USING btree (ds_comorbidades, ds_vacinados, ds_faixa_etaria);
CREATE INDEX fat_casos_covid_sk_ubs_cnes_idx ON hackathona.fat_casos_covid USING btree (sk_ubs_cnes, ds_mes, ds_casos);


-- hackathona.fat_obitos definition

-- Drop table

-- DROP TABLE hackathona.fat_obitos;

CREATE TABLE hackathona.fat_obitos (
	pk_obitos serial4 NOT NULL,
	sk_ubs_cnes int4 NOT NULL,
	ds_mes date NOT NULL,
	ds_vacinados bpchar(3) NULL,
	ds_comorbidades varchar(50) NULL,
	qt_total_obitos int2 NULL,
	qt_novos_obitos int2 NULL,
	tx_letalidade numeric(4, 2) NULL,
	tx_mortalidade numeric(4, 2) NULL,
	CONSTRAINT fat_obitos_pk PRIMARY KEY (pk_obitos),
	CONSTRAINT fat_obitos_fk FOREIGN KEY (sk_ubs_cnes) REFERENCES hackathona.dim_ubs(pk_ubs_cnes)
);
CREATE INDEX fat_obitos_sk_ubs_cnes_idx ON hackathona.fat_obitos USING btree (sk_ubs_cnes, ds_mes, ds_vacinados, ds_comorbidades);


-- hackathona.fat_testagem definition

-- Drop table

-- DROP TABLE hackathona.fat_testagem;

CREATE TABLE hackathona.fat_testagem (
	pk_testagem serial4 NOT NULL,
	sk_ubs_cnes int4 NOT NULL,
	ds_mes date NOT NULL,
	tp_teste varchar(20) NULL,
	qt_testes_realizados int2 NULL,
	tx_negativos numeric(4, 2) NULL,
	tx_positivos numeric(4, 2) NULL,
	tx_com_sintomas numeric(4, 2) NULL,
	tx_sem_sintomas numeric(4, 2) NULL,
	tx_novo_teste numeric(4, 2) NULL,
	CONSTRAINT fat_testagem_pk PRIMARY KEY (pk_testagem),
	CONSTRAINT fat_testagem_fk FOREIGN KEY (sk_ubs_cnes) REFERENCES hackathona.dim_ubs(pk_ubs_cnes)
);
CREATE INDEX fat_testagem_sk_ubs_cnes_idx ON hackathona.fat_testagem USING btree (sk_ubs_cnes, ds_mes, tp_teste);


-- hackathona.fat_vacinas definition

-- Drop table

-- DROP TABLE hackathona.fat_vacinas;

CREATE TABLE hackathona.fat_vacinas (
	pk_vacinas serial4 NOT NULL,
	sk_ubs_cnes int4 NOT NULL,
	ds_mes date NOT NULL,
	ds_dose varchar(20) NULL,
	tx_dose numeric(4, 2) NULL,
	qt_aplicada int2 NULL,
	qt_estoque int2 NULL,
	ds_acima_12_anos bpchar(3) NULL,
	ds_fabricante varchar(50) NULL,
	CONSTRAINT fat_vacinas_pk PRIMARY KEY (pk_vacinas),
	CONSTRAINT fat_vacinas_fk FOREIGN KEY (sk_ubs_cnes) REFERENCES hackathona.dim_ubs(pk_ubs_cnes)
);
CREATE INDEX fat_vacinas_sk_ubs_cnes_idx ON hackathona.fat_vacinas USING btree (sk_ubs_cnes, ds_mes, ds_dose, ds_acima_12_anos, ds_fabricante);


-- hackathona.vw_casos_covid source

CREATE MATERIALIZED VIEW hackathona.vw_casos_covid
TABLESPACE pg_default
AS SELECT ubs.pk_ubs_cnes,
    ubs.ds_regiao,
    ubs.tp_estabelecimento,
    ubs.nm_estabelecimento,
    ubs.ds_endereco,
    ubs.ds_complemento,
    ubs.nu_numero,
    ubs.ds_regiao_administrativa,
    ubs.ds_bairro,
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
     JOIN hackathona.fat_casos_covid cov ON ubs.pk_ubs_cnes = cov.sk_ubs_cnes
WITH DATA;

-- View indexes:
CREATE INDEX vw_casos_covid_ds_regiao_idx ON hackathona.vw_casos_covid USING btree (ds_regiao, tp_estabelecimento, nm_estabelecimento, ds_regiao_administrativa, ds_mes, ds_casos, ds_faixa_etaria, ds_comorbidades, ds_vacinados);
CREATE INDEX vw_casos_covid_pk_ubs_cnes_idx ON hackathona.vw_casos_covid USING btree (pk_ubs_cnes);


-- hackathona.vw_obitos source

CREATE MATERIALIZED VIEW hackathona.vw_obitos
TABLESPACE pg_default
AS SELECT ubs.pk_ubs_cnes,
    ubs.ds_regiao,
    ubs.tp_estabelecimento,
    ubs.nm_estabelecimento,
    ubs.ds_endereco,
    ubs.ds_complemento,
    ubs.nu_numero,
    ubs.ds_regiao_administrativa,
    ubs.ds_bairro,
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
                  GROUP BY fat_obitos.sk_ubs_cnes, fat_obitos.ds_mes, fat_obitos.ds_comorbidades) t2 ON t1.sk_ubs_cnes = t2.sk_ubs_cnes AND t1.ds_mes::text = t2.ds_mes::text AND t1.ds_comorbidades::text = t2.ds_comorbidades::text) obt ON ubs.pk_ubs_cnes = obt.sk_ubs_cnes
WITH DATA;

-- View indexes:
CREATE INDEX vw_obitos_pk_ubs_cnes_idx ON hackathona.vw_obitos USING btree (pk_ubs_cnes);
CREATE INDEX vw_obitos_tp_estabelecimento_idx ON hackathona.vw_obitos USING btree (tp_estabelecimento, ds_regiao, nm_estabelecimento, ds_regiao_administrativa, ds_mes, ds_vacinados, ds_comorbidades);


-- hackathona.vw_testagem source

CREATE MATERIALIZED VIEW hackathona.vw_testagem
TABLESPACE pg_default
AS SELECT ubs.pk_ubs_cnes,
    ubs.ds_regiao,
    ubs.tp_estabelecimento,
    ubs.nm_estabelecimento,
    ubs.ds_endereco,
    ubs.ds_complemento,
    ubs.nu_numero,
    ubs.ds_regiao_administrativa,
    ubs.ds_bairro,
    ttg.ds_mes,
    ttg.tp_teste,
    ttg.qt_testes_realizados,
    ttg.tx_negativos,
    ttg.tx_positivos,
    ttg.tx_com_sintomas,
    ttg.tx_sem_sintomas,
    ttg.tx_novo_teste
   FROM hackathona.dim_ubs ubs
     JOIN hackathona.fat_testagem ttg ON ubs.pk_ubs_cnes = ttg.sk_ubs_cnes
WITH DATA;

-- View indexes:
CREATE INDEX vw_testagem_ds_regiao_idx ON hackathona.vw_testagem USING btree (ds_regiao, tp_estabelecimento, nm_estabelecimento, ds_regiao_administrativa, ds_mes, tp_teste);
CREATE INDEX vw_testagem_pk_ubs_cnes_idx ON hackathona.vw_testagem USING btree (pk_ubs_cnes);


-- hackathona.vw_ubs source

CREATE MATERIALIZED VIEW hackathona.vw_ubs
TABLESPACE pg_default
AS SELECT dim_ubs.pk_ubs_cnes,
    dim_ubs.ds_regiao AS regiao_saude,
    dim_ubs.ds_regiao_administrativa AS regiao_administrativa,
    "right"(dim_ubs.nm_estabelecimento::text, length(dim_ubs.nm_estabelecimento::text) - "position"(dim_ubs.nm_estabelecimento::text, ' - '::text) - 2)::character varying AS bairro,
    dim_ubs.nm_estabelecimento AS ubs,
    dim_ubs.co_lat,
    dim_ubs.co_lon
   FROM hackathona.dim_ubs
WITH DATA;

-- View indexes:
CREATE INDEX vw_ubs_pk_ubs_cnes_idx ON hackathona.vw_ubs USING btree (pk_ubs_cnes);
CREATE INDEX vw_ubs_regiao_saude_idx ON hackathona.vw_ubs USING btree (regiao_saude, regiao_administrativa, bairro, ubs);


-- hackathona.vw_vacinas source

CREATE MATERIALIZED VIEW hackathona.vw_vacinas
TABLESPACE pg_default
AS SELECT ubs.pk_ubs_cnes,
    ubs.ds_regiao,
    ubs.tp_estabelecimento,
    ubs.nm_estabelecimento,
    ubs.ds_endereco,
    ubs.ds_complemento,
    ubs.nu_numero,
    ubs.ds_regiao_administrativa,
    ubs.ds_bairro,
    vac.ds_mes,
    vac.ds_dose,
    vac.tx_dose,
    vac.qt_aplicada,
    vac.qt_estoque,
    vac.ds_acima_12_anos,
    vac.ds_fabricante
   FROM hackathona.dim_ubs ubs
     JOIN hackathona.fat_vacinas vac ON ubs.pk_ubs_cnes = vac.sk_ubs_cnes
WITH DATA;

-- View indexes:
CREATE INDEX vw_vacinas_ds_regiao_idx ON hackathona.vw_vacinas USING btree (ds_regiao, tp_estabelecimento, nm_estabelecimento, ds_regiao_administrativa, ds_mes, ds_dose);
CREATE INDEX vw_vacinas_pk_ubs_cnes_idx ON hackathona.vw_vacinas USING btree (pk_ubs_cnes);
