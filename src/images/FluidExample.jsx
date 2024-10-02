import Image from 'react-bootstrap/Image';

function FluidExample({src}) {
  return <Image 
  src={src} 
  fluid
  />;
}

export default FluidExample;