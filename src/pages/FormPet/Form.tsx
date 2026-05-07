import Menu from "../../components/Menu";

import Swal from "sweetalert2";

import { useNavigate } from "react-router";
import { useState } from "react";

import "./Form.css";

function Form() {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [raca, setRaca] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("");
  const [porte, setPorte] = useState("");
  const [cor, setCor] = useState("");
  const [imagem, setImagem] = useState("");
  const [descricao, setDescricao] = useState("");

  const navegar = useNavigate();

  async function cadastrarPet(event: React.SubmitEvent) {
    try {
      event.preventDefault();

      const resposta = await fetch("http://localhost:3000/api/Pet", {
        method: "POST",
        body: JSON.stringify({
          nome: nome,
          tipo: tipo,
          raca: raca,
          idade: idade,
          sexo: sexo,
          porte: porte,
          cor: cor,
          imagem: imagem,
          descricao: descricao,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dados = await resposta.json();

      if (resposta.ok === false) {
        throw new Error(dados);
      }

      Swal.fire({
        icon: "success",
        title: "TUDO CERTO!",
        text: "Pet cadastrado com sucesso!",

        customClass: {
          icon: "swal_icon_center",
        },
      });

      navegar("../Pets");
      
    } catch (erro) {
      Swal.fire({
        icon: "error",
        title: "ERRO",
        text: "Não foi possível realizar seu cadastro, tente novamente ou entre em contato com o suporte (21) 4001-2222",

        customClass: {
          icon: "swal_icon_center",
        },
      });
    }
  }

  return (
    <div>
      <Menu />

      <div className="container_form_cadastro">
        <div className="cabecalho_form_cadastro">
          <h2 className="titulo_listagem">Cadastro de Pet</h2>
          <a className="link_voltar" href="../Pets">
            ⟵ Voltar
          </a>
        </div>

        <div className="container_informacoes_pet_form">
          <form onSubmit={cadastrarPet} className="informacoes_pet_form">
            <h2>Informações Gerais do Pet</h2>
            <div className="container_imagem_pet_form_cadastro">
              {imagem ? (
                <img className="imagem_pet_form_cadastro" src={imagem} />
              ) : (
                <div className="imagem_placeholder">
                  📷
                  <br />
                  <small>Adicione uma URL de imagem</small>
                </div>
              )}
            </div>

            <div className="container_campos_form_cadastro">
              <div className="campo_form_cadastro">
                <label>Nome do Pet *</label>
                <input
                  type="text"
                  placeholder="Ex: Rex"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div className="campo_form_cadastro">
                <label>Tipo *</label>
                <select
                  required
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="">Selecione</option>
                  <option value="Cachorro">Cachorro</option>
                  <option value="Gato">Gato</option>
                </select>
              </div>
            </div>

            <div className="container_campos_form_cadastro">
              <div className="campo_form_cadastro">
                <label>Raça *</label>
                <input
                  type="text"
                  placeholder="Ex: labrador"
                  required
                  value={raca}
                  onChange={(e) => setRaca(e.target.value)}
                />
              </div>

              <div className="campo_form_cadastro">
                <label>Idade *</label>
                <input
                  type="text"
                  placeholder="Ex: 3 anos"
                  required
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                />
              </div>
            </div>

            <div className="container_campos_form_cadastro">
              <div className="campo_form_cadastro">
                <label>Sexo *</label>
                <select
                  required
                  value={sexo}
                  onChange={(e) => setSexo(e.target.value)}
                >
                  <option value="">Selecione</option>
                  <option value="macho">Macho</option>
                  <option value="femea">fêmea</option>
                </select>
              </div>

              <div className="campo_form_cadastro">
                <label>Porte *</label>
                <select
                  required
                  value={porte}
                  onChange={(e) => setPorte(e.target.value)}
                >
                  <option value="">Selecione</option>
                  <option value="pequeno">Pequeno</option>
                  <option value="medio">Médio</option>
                  <option value="grande">Grande</option>
                </select>
              </div>
            </div>

            <div className="container_campos_form_cadastro">
              <div className="campo_form_cadastro">
                <label>Cor *</label>
                <input
                  type="text"
                  placeholder="Ex: Preto e Branco"
                  required
                  value={cor}
                  onChange={(e) => setCor(e.target.value)}
                />
              </div>

              <div className="campo_form_cadastro">
                <label>URL da Imagem *</label>
                <input
                  type="url"
                  placeholder="https://exemplo.com/foto.png"
                  required
                  value={imagem}
                  onChange={(e) => setImagem(e.target.value)}
                />
              </div>
            </div>

            <div className="descricao_form_cadastro">
              <label>Descrição *</label>
              <textarea
                placeholder="Descreva o pet, sua personalidade e características..."
                required
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              ></textarea>
            </div>

            <div className="container_botao_salvar_form">
              <button type="submit">Salvar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
