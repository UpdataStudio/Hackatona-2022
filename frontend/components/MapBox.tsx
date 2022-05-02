import React from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import ReactDOMServer from 'react-dom/server';

import layerRideGeojson from '@/config/geojson/rasDF';

import { VacinaPopup } from './Dashboard/Vacina.popup';
import CasosPopup from './Dashboard/Popups/Casos';
import { ObitoPopup } from './Dashboard/Popups/Obito';

import 'leaflet/dist/leaflet.css';
import { Loading } from './UI';
import { icon } from 'leaflet';
import TestagemPopup from './Dashboard/Popups/Testagem';

import { apiServerLocal } from '@/services/api';

const UBSPopup = styled(Popup)`
  .leaflet-popup-content-wrapper {
    max-width: 150px;
  }
`;

const markerIcon = icon({
  iconUrl: '/cims-df/marker-icon.png',
  shadowUrl: '/cims-df/marker-shadow.png',
  iconRetinaUrl: '/cims-df/marker-icon-2x.png',
});

const PopupRegion = ({ regiao, feature, tab }: any) => {
  let render;
  switch (tab) {
    case 'vacina':
      render = <VacinaPopup data={feature} />
      break;
    case 'casos':
      render = <CasosPopup data={feature} />
      break;
    case 'testagem':
      render = <TestagemPopup data={feature} />
      break;
    case 'obito':
      render = <ObitoPopup data={feature} />
      break;

    default:
      break;
  }
  return (
    <div>
      <span>{regiao}</span>
      {render}
    </div>
  );
};

export default function MapBox({ active, region }: any) {
  const [loading, setLoading] = React.useState(false);
  const [rangeMap, setRangeMap] = React.useState({});

  React.useEffect(() => {
    const getRangesMapa = async () => {
      const {data} = await apiServerLocal.get('/api/dashboard/range-color-map');
      setRangeMap(data);
    }
    getRangesMapa();
  }, []);
  
  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500)
  }, [active]);

  if (!region) {
    return <Loading />;
  }

  const ubs = Object.values(region)
    .reduce((prev, curr) => {
      const item = curr as any;
      return [
        ...prev as any[],
        ...item.ubs
      ];
    }, []) as any[];

  const onEachFeature = (feature: any, layer: any) => {
    const regionData = region[feature.properties.reg_saude];
    const popupContent = ReactDOMServer.renderToString(
      <PopupRegion
        regiao={feature.properties.reg_saude}
        feature={regionData}
        tab={active}
      />
    );
    layer.bindPopup(popupContent);
  };

  const getColorByRegion = (feature: any) => {
    let regionName = feature?.properties?.reg_saude;
    const mapConfigColor = {
      testagem: {
        field: 'testes_realizados',
        // @ts-ignore
        options: rangeMap['Testagem']
      },
      vacina: {
        field: 'dose única',
        // @ts-ignore
        options: rangeMap['Vacina']
      },
      casos: {
        field: 'total_casos',
        // @ts-ignore
        options: rangeMap['Casos']
      },
      obito: {
        field: 'tx_mortalidade',
        // @ts-ignore
        options: rangeMap['Óbito']
      }
    }

    // @ts-ignore
    const rangeConfig = mapConfigColor[active];
    const value = region[regionName][rangeConfig?.field];

    const getColorByRange = () => {
      let color = '';
      rangeConfig?.options.forEach((option: any, i: number) => {
        // console.log(value, 'minimo', parseFloat(option.minimo), parseFloat(option.maximo), option.cor);
        
        if (value > parseFloat(option.minimo) && value < parseFloat(option.maximo))
          color = option.cor
      });
      return color;
    }

    let color = '#01386B';
    if (true || active === 'obito') {
      color = getColorByRange();
      // console.log(color);
      
    } else {
      switch (regionName) {
        case 'REGIÃO LESTE': color = '#264653'; break;
        case 'REGIÃO OESTE': color = '#287271'; break;
        case 'REGIÃO NORTE': color = '#2A9D8F'; break;
        case 'REGIÃO SUL': color = '#E9C46A'; break;
        case 'REGIÃO CENTRO-SUL': color = '#F4A261'; break;
        case 'REGIÃO CENTRAL': color = '#E76F51'; break;
        default: color = '#000';
      }
    }

    return {
      fillColor: color,
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '0',
      fillOpacity: 0.4
    }
  }

  return loading
    ? <Loading />
    : (
      <MapContainer
        center={[-15.80, -47.87]}
        zoom={10}
        scrollWheelZoom={true}
        style={{ height: '100%', width: "100%" }}>
        <TileLayer
          attribution=''
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          key={'my-map-RIDE'}
          //@ts-ignore
          data={layerRideGeojson}
          onEachFeature={onEachFeature}
          style={getColorByRegion}
        >
        </GeoJSON>
        {
          ubs.map((current: any) => (
            <Marker
              key={current.id}
              position={[
                current.latitude,
                current.longitude,
              ]}
              title={current.nome}
              icon={markerIcon}
            >
              <UBSPopup>
                {current.nome}
              </UBSPopup>
            </Marker>
          ))
        }
      </MapContainer>
    )
}
