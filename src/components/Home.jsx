import "./home.css";
import Homepage from "../assets/home.png";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  return (
    <>
	<br /><br />
	<h1>Online Library Management System</h1>
	<br />
	<h3><TypeAnimation 
      sequence={[
        
        'नमस्ते, आपका स्वागत है 🙏',
        2000, 
        'Hello, Welcome!! 👋',
        2000,
        'Hallo, willkommen',
        2000,
        'नमस्कार स्वागतम् 🙏',
        2000,
		'Привет, добропожаловать',
        2000,
		'Hola bienvenido',
		2000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
	</h3>
	
	<br />
	<div className="centeredImage">
     <img src={Homepage} alt="homepage" />
	 </div>
    </>
  );
}
