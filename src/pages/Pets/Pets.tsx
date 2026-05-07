import Menu from "../../components/Menu";

import { PiMagnifyingGlassDuotone } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa";

import { useEffect, useState } from "react";

import "./Pets.css";

function Pets() {
  const nomeDousuario = localStorage.getItem("@nome-do-usuario");

  const [pets, setPets] = useState([]);

  const [tipo, setTipo] = useState("");

  const [palavra, setPalavra] = useState("");

  async function mostrarPets() {
    const resposta = await fetch("http://localhost:3000/api/admin/pets");
    const dados = await resposta.json();
    setPets(dados.pets);
  }

  useEffect(() => {
    mostrarPets();
  }, []);

  function formatarData(data) {
    return new Date(data).toLocaleDateString("pt-br");
  }

  const petsFiltradostipo = pets.filter((pet) => pet.tipo.includes(tipo));

  const petsFiltradospalavra = petsFiltradostipo.filter((pet) =>
    pet.nome.toLowerCase().includes(palavra.toLowerCase()),
  );

  return (
    <div className="body_container_principal">
      <Menu />

      <p className="saudacao_usuario">Bem vindo, {nomeDousuario}! </p>

      <div className="container_principal_listagem">
        <div className="container_cabecalho_listagem">
          <h2 className="titulo_listagem">Pets Cadastrados</h2>
          <p className="subtitulo_listagem">
            Visualize e gerencie todos pets e suas solicitações de adoção
          </p>
        </div>

        <div className="container_busca_listagem">
          <div className="container_input">
            <PiMagnifyingGlassDuotone fontSize={22} color="#00b4fc" />
            <input
              value={palavra}
              onChange={(event) => setPalavra(event.target.value)}
              type="text"
              placeholder="Pesquisar por nome..."
            />
          </div>

          <div className="container_botoes_filtro">
            <button
              onClick={() => setTipo("")}
              className={`botao_filtro ${tipo === "" ? "botao_filtro_ativo" : ""}`}
            >
              Todos
            </button>
            <button
              onClick={() => setTipo("Cachorro")}
              className={`botao_filtro ${tipo === "Cachorro" ? "botao_filtro_ativo" : ""}`}
            >
              🐶 Cachorros
            </button>
            <button
              onClick={() => setTipo("Gato")}
              className={`botao_filtro ${tipo === "Gato" ? "botao_filtro_ativo" : ""}`}
            >
              🐱 Gatos
            </button>
          </div>
        </div>

        {petsFiltradospalavra.map((pet) => (
          <div key={pet.id} className="container_pet_card">
            <div className="pet_card">
              <div className="pet_cabecalho_card">
                <div className="pet_info">
                  <img src={pet.foto} alt="foto-de-pet" className="pet_foto" />

                  <div className="container_informacoes_pet">
                    <h2 className="nome_pet">{pet.nome}</h2>
                    <p className="informacoes_pet">
                      {pet.raca} • {pet.idade} • {pet.tipo} • {pet.sexo}
                    </p>
                  </div>
                </div>

                <span className="pet_quantidade_solicitações">
                  {pet.adocoes.length} adoções
                </span>
              </div>

              <div className="pet_descricao">{pet.descricao}</div>

              <div className="pet_tabela_adoçoes">
                <h2>📝 Solicitações de Adoção</h2>

                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Telefone</th>
                      <th>Moradia</th>
                      <th>Imóvel</th>
                      <th>Pessoas</th>
                      <th>Data</th>
                      <th>Ações</th>
                    </tr>
                  </thead>

                  <tbody>
                    {pet.adocoes.map((adocao) => (
                      <tr key={adocao.nome}>
                        <td>{adocao.nome}</td>
                        <td>{adocao.telefone}</td>
                        <td>{adocao.tipoMoradia}</td>
                        <td>{adocao.imovel}</td>
                        <td>{adocao.pessoas}</td>
                        <td>{formatarData(adocao.dataCadastro)}</td>
                        <td>
                          <a
                            target="_blank"
                            href={`https://wa.me/${adocao.telefone}`}
                          >
                            <FaWhatsapp fontSize={25} /> Falar no WhatsApp
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pets;
