import styled, { createGlobalStyle, keyframes } from 'styled-components';

function getWidthGrid(value: any) {
  if (!value) return;
  let width = value / 12 * 100;
  return `width: ${width}%;`;
}
export const theme = {
  primary: '#FD4542',
  secondary: '#154673',
  dark: '#0B142B',
  textColor: '#4a4a4a',
  backgroundSilver: '#E5E5E5',
  tagType: '#F3A023',
  tagState: '#7866D1',
  tagOffer: '#FF7A41'
}

export const Background = styled.div`
  background: ${(props: any) => props.color};
  z-index: 9999;
`

export const Container = styled.div`
  max-width: 1360px;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
  box-sizing: border-box;
  &:before,
  &:after {
    content: "";
    display: table;
  }
  &:after {
    clear: both;
  }
`

export const Row = styled.div`
  width: 100%;
  height: auto;
  float: left;
  // padding-top: 80px;
  box-sizing: border-box;
  &:before,
  &:after {
    content: "";
    display: table;
  }
  &:after {
    clear: both;
  }
`
export const TagContainer = styled.div`
  display: flex;
  margin: 0 5px;
  padding-top: ${(props: any) => props.paddingTop};
`

export const Tag = styled.span`
  background-color: ${(props: any) => props.color};
  border-radius: 17px;
  color: white;
  cursor: pointer;
  margin-right: 5px;
  padding: 2px 9px;
  size: 10px;
  font-size: 10px;
  font-weight: 500;
  line-height: 11.72px;
  text-align: center;
}
`

export const SocialMediaContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: ${(props: any) => props.justifyStart || 'flex-end'};
  padding-top: ${(props: any) => props.noPaddingTop || '36px'};
`

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props: any) => props.marginTop};
  max-height: ${(props: any) => props.maxHeight};
`

export const Button = styled.button`
  background: #800045;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: 700;
  height: 31px;
  width: 92px;
  cursor: pointer;
`

export const PopupContent = styled.div`
  max-height: 250px;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 4px;
    z-index: 99999;
  }
  ::-webkit-scrollbar-track {
    background: ${theme.dark};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${theme.primary};    /* color of the scroll thumb */
    border-radius: 20px;       /* roundness of the scroll thumb */
    border: 3px solid ${theme.primary};  /* creates padding around scroll thumb */
  }
`

export const TitlePopup = styled.h3`
  color: #FD4542;
  font-size: 14px;
  font-style: normal;
  margin-bottom: 5px;
`

export const TextPopup = styled.p`
  margin-bottom: 10px;
`

export const SubTitle = styled.h4`
  color: ${theme.primary};
  padding-top: ${(props: any) => props.paddingTop || "43px"};
  padding-bottom: 5px;
`

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props: any) => props.height || 'auto'};
`

export const Bolder = styled.div`
  font-weight: bolder;
  color: ${theme.primary};
`

export const InfoCard = styled.div`
  background: #FFF;
  border-radius: 13px;
  color: black;
  padding: 30px;
`

export const Column = styled.div`
  float: left;
  padding: ${(props: any) => props.noPadding ? '' : '.5rem'};
  min-height: 1px;
  box-sizing: border-box;

  @media only screen and (max-width: 768px) {
    ${({ mobile }: any) => mobile && getWidthGrid(mobile)}
    padding: ${(props: any) => props.noPadding ? '' : '.5rem .1rem'};
  }

  @media only screen and (min-width: 768px) {
    ${({ tablet }: any) => tablet && getWidthGrid(tablet)}
  }

  @media only screen and (min-width: 1000px) {
    ${({ desktop }: any) => desktop && getWidthGrid(desktop)}
  }
`

export const ContainerSelect = styled.div`
  color: black;
  margin-left: 10px;
  width: ${(props: any) => props.width || '200px'};
  z-index: 1002;
  //div[class*='-control'] {
  //  min-height: 28px;
  //  height: 30px;
  //}
  //div[class*='-placeholder'], div[class*='ValueContainer'] {
  //  margin-top: -3px;
  //  line-height: 1;
  //  font-size: 13px;
  //}
  //div[class*='-indicatorContainer'] {
  //  padding: 5px;
  //}
`

const godown = keyframes`
  from {top:0px; opacity: 1;}
  to {top:60px; opacity: 1}
`

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: #e9eef5;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

.no-title .rdt_TableHead {
  display: none;
}

body::-webkit-scrollbar {
  width: 6px;               /* width of the entire scrollbar */
}

body::-webkit-scrollbar-track {
  background: ${theme.dark};        /* color of the tracking area */
}

body::-webkit-scrollbar-thumb {
  background-color: ${theme.primary};    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 3px solid ${theme.primary};  /* creates padding around scroll thumb */
}

div[class*='BaseModalBackground'] {
    z-index: 11000;
}

div[class*='BoxContainer__BoxContent'] {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.pagination {
  ul {
    display: flex;
    float: right;
    li {
      cursor: pointer;
      color: ${theme.dark};
      list-style-type: none;
      text-align: center;
      width: 30px;
      &.previous {
        width: 100px;
      }
      &.next {
        width: 100px;
      }
      &.disabled {
        color: ${theme.textColor};
        cursor: no-drop;
      }
      &.selected {
        color: ${theme.primary};
        background: #fd45422b;
        border-radius: 50%;
        height: 25px;
        width: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: -2px;
      }
    }
  }

}

.popup-style .leaflet-popup-content-wrapper {
  background: ${theme.dark};
  color: #fff;
}

.leaflet-popup-content-wrapper {
  width: 460px;
}

#root__title {
  display: none !important;
}
#root_address__title {
  display: none !important;
}
#root_address_cidade__title {
  display: none !important;
}
#root_address_estado__title {
  display: none !important;
}
#root__description {
  display: none !important;
}

.form-title {
  color: #4F4F4F;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid #E0E0E0
}
.form-description {
  color: #4F4F4F;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
}

.control-label {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #4F4F4F;
}

.field-description {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #4F4F4F;
}

.field-string {
  margin-bottom: 15px;
}

.radio {
  margin-top: 5px;
  margin-bottom: 5px;
}

.form-control {
  margin-top: 10px;
}

.form-group {
  margin-top: 10px;
}

.checkbox label span {
  margin-left: 10px;
  color: #4F4F4F;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
}

.radio label span span {
  margin-left: 10px;
  color: #4F4F4F;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
}

.success-background {
  position: fixed;
  width: 100%;
  background-color: #439B8B;
  z-index: 0
}

.success-message {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  margin: 0;
  padding: 10px 0;
}

.error-background {
  position: fixed;
  width: 100%;
  background-color: #F37070;
  z-index: 1
}

.activate {
  animation: ${godown} 1s ease-out forwards;
}

.error-message {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  margin: 0;
  padding: 10px 0;
}

`