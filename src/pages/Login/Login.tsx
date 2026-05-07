import { useState } from "react";
import { useNavigate } from "react-router";

import logo from "../../assets/logo_cat_dog.webp";
import Swal from "sweetalert2";

import "./Login.css";

function Login() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  const navegar = useNavigate();

  async function realizarLogin(event: React.SubmitEvent) {
    try {
      event.preventDefault();

      const resposta = await fetch("http://localhost:3000/api/users/login", {
        method: "post",
        body: JSON.stringify({
          cpf: cpf,
          senha: senha,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dados = await resposta.json();

      if (resposta.ok === false) {
        throw new Error(dados.erro);
      }

      localStorage.setItem("@nome-do-usuario", dados.dados.nome);

      Swal.fire({
        icon: "success",
        title: "CREDENCIAIS VALIDADAS",
        text: dados.mensagem,

        // Centraliza o icone do alerta de mensagem
        customClass: {
          icon: "swal_icon_center",
        },
      });

      navegar("/Pets");

      setCpf("");
      setSenha("");
    } catch (erro) {
      Swal.fire({
        icon: "error",
        title: "ERRO",
        text: erro.message,

        customClass: {
          icon: "swal_icon_center",
        },
      });
    }
  }

  return (
    <div className="container_principal">
      <div className="container_login">
        <div className="container_cabecalho_login">
          <div className="titulo_login">
            <img src={logo} width={70} alt="imagem-de-logo" />
            <h1>PetAdopt Admin</h1>
          </div>
          <h2>Painel Administrativo</h2>
        </div>

        <form onSubmit={realizarLogin} className="container_form_login">
          <label>CPF</label>
          <div className="input_tela">
            <input
              type="text"
              placeholder="000.000.000-00"
              required
              value={cpf}
              onChange={(event) => setCpf(event.target.value)}
            />
          </div>

          <label>Senha</label>
          <div className="input_tela">
            <input
              type="password"
              placeholder="Digite sua senha"
              required
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
            />
          </div>
          <button type="submit" className="botao_tela">
            Entrar
          </button>
        </form>

        <div className="instrucao_login">
          <p>Faça login com suas credenciais de funcionário</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
