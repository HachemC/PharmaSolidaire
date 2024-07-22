import "./registerstyle.css";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
export function Register() {
  const nav = useNavigate();
  return (
    <div className="register-container">
      <div className="icon">
        <img src={require("../images/1.png")} alt="none" />
      </div>
      <p className="welcometextt">Créez votre compte et faites la différence</p>

      <form className="register-form-container">
        <div className="c11">s'inscrire</div>
        <div className="c12">
          vous avez deja un compte?<br></br>
          <span onClick={() => nav("/login")}>se connecter</span>
        </div>
        <div className="c1">
          <label>Nom</label>
          <input type="text" placeholder="Nom" />
        </div>
        <div className="c2">
          <label>Prénom</label>
          <input type="text" placeholder="Prénom" />
        </div>
        <div className="c3">
          <label>Numéro d’enregistrement</label>
          <input type="number" placeholder="Numéro d’enregistrement" />
        </div>
        <div className="c4">
          <label>Téléphone de pharmacie</label>
          <input type="number" placeholder="Téléphone de pharmacie" />
        </div>
        <div className="c5">
          <label>Email</label>
          <input type="email" placeholder="Email" />
        </div>
        <div className="c6">
          <label>Mot de passe</label>
          <input type="password" placeholder="Mot de passe" />
        </div>
        <div className="c7">
          <label>Location</label>
          <select>
            <option value="gabes">Gabes</option>
            <option value="tunis">Tunis</option>
            <option value="sousse">Sousse</option>
          </select>
        </div>
        <div className="c8">
          <input type="text" placeholder="Adresse" />
        </div>
        <div className="c9">
          <input type="text" placeholder="Code postal" />
        </div>
        <div className="position">
          <p>Utiliser votre position</p>
          <button>Utiliser</button>
        </div>
        <div className="c10">
          <button className="c10-1">S'inscrire</button>
        </div>
      </form>

      <div className="foot1">
        <Footer />
      </div>
    </div>
  );
}
