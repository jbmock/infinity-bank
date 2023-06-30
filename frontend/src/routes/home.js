import logo from '../images/bank_logo.png';

export default function Home() {
  return (
    <div className="logo-card">
      <div className="card-body">
        <h5 className="card-header">Welcome to Infinity Bank</h5><br/>
        <p className="card-text">Where the possibilities are infinite</p>
        <img className="logo-img" src={logo} alt="logo"/>
      </div>
    </div>
    );
}
