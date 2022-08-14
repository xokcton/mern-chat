import Logo from '../assets/logo.svg'

const Brand = ({ isH1 }) => {
  return (
    <div className="brand">
      <img src={Logo} alt="logo" />
      {
        isH1 ? 
        <h1>shnappy</h1>
        :
        <h3>shnappy</h3>
      }
      
    </div>
  )
}

export default Brand