import React, { useState, useEffect } from 'react';
import "./PainelDoUsuario.css";

const PainelDoUsuario = () => {
  const [activeTab, setActiveTab] = useState('perfil');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Endereço base do seu servidor backend
  const API_BASE_URL = 'http://localhost:5000/api'; 

  // Estados dos formulários e consultas
  const [profile, setProfile] = useState({ nome: '', email: '' });
  const [passwords, setPasswords] = useState({ atual: '', nova: '', confirmar: '' });
  const [consultas, setConsultas] = useState([]);
  const [mensagem, setMensagem] = useState('');

  // 1. CARREGAR DADOS DO BANCO DE DADOS QUANDO O COMPONENTE CARREGAR
  useEffect(() => {
    const carregarDadosDoUsuario = async () => {
      try {
        setLoading(true);
        // Recupera token de autenticação caso sua API utilize JWT
        const token = localStorage.getItem('token'); 
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        // Executa as duas requisições ao mesmo tempo
        const [resPerfil, resConsultas] = await Promise.all([
          fetch(`${API_BASE_URL}/usuario/perfil`, { headers }),
          fetch(`${API_BASE_URL}/usuario/consultas`, { headers })
        ]);

        if (!resPerfil.ok || !resConsultas.ok) {
          throw new Error('Não foi possível carregar os dados do servidor.');
        }

        const dataPerfil = await resPerfil.json();
        const dataConsultas = await resConsultas.json();

        setProfile({
          nome: dataPerfil.nome,
          email: dataPerfil.email
        });
        setConsultas(dataConsultas);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    carregarDadosDoUsuario();
  }, []);

  // 2. ATUALIZAR NOME E E-MAIL NO BANCO DE DADOS
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/usuario/perfil`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });

      if (!response.ok) throw new Error('Falha ao atualizar dados pessoais.');

      setMensagem('Dados alterados com sucesso!');
      setTimeout(() => setMensagem(''), 3000);
    } catch (err) {
      alert(err.message);
    }
  };

  // 3. ALTERAR SENHA NO BANCO DE DADOS
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwords.nova !== passwords.confirmar) {
      alert('A nova senha e a confirmação não coincidem.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/usuario/senha`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          senhaAtual: passwords.atual,
          novaSenha: passwords.nova
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensagem || 'Erro ao alterar a senha.');
      }

      setMensagem('Senha atualizada com sucesso!');
      setPasswords({ atual: '', nova: '', confirmar: '' });
      setTimeout(() => setMensagem(''), 3000);
    } catch (err) {
      alert(err.message);
    }
  };

  // 4. CANCELAR CONSULTA NO BANCO DE DADOS
  const handleCancelarConsulta = async (id) => {
    if (!window.confirm('Deseja realmente cancelar este agendamento?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/usuario/consultas/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Erro ao cancelar a consulta.');

      // Remove do estado local se a deleção no banco ocorreu com sucesso
      setConsultas(consultas.filter(c => c.id !== id));
      setMensagem('Consulta cancelada com sucesso!');
      setTimeout(() => setMensagem(''), 3000);
    } catch (err) {
      alert(err.message);
    }
  };

  // Renderização enquanto carrega dados do banco
  if (loading) {
    return <div className="panel-container"><p>Carregando informações...</p></div>;
  }

  // Renderização caso haja erro de comunicação
  if (error) {
    return <div className="panel-container"><p style={{ color: 'red' }}>Erro: {error}</p></div>;
  }

  return (
    <div className="panel-container">
      {/* Navegação Lateral */}
      <aside className="panel-sidebar">
        <div className="user-profile-summary">
          <div className="avatar">
            {profile.nome ? profile.nome.substring(0, 2).toUpperCase() : 'US'}
          </div>
          <div>
            <h3>{profile.nome}</h3>
            <p>Paciente</p>
          </div>
        </div>
        <nav className="panel-nav">
          <button 
            className={activeTab === 'perfil' ? 'active' : ''} 
            onClick={() => setActiveTab('perfil')}
          >
            Dados Pessoais e Segurança
          </button>
          <button 
            className={activeTab === 'consultas' ? 'active' : ''} 
            onClick={() => setActiveTab('consultas')}
          >
            Minhas Consultas
          </button>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className="panel-content">
        {mensagem && <div className="alert-success">{mensagem}</div>}

        {activeTab === 'perfil' && (
          <div className="card">
            <h2>Dados Pessoais</h2>
            <form onSubmit={handleProfileSubmit} className="form-grid">
              <div className="form-group">
                <label>Nome Completo</label>
                <input 
                  type="text" 
                  value={profile.nome} 
                  onChange={(e) => setProfile({ ...profile, nome: e.target.value })}
                  required 
                />
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input 
                  type="email" 
                  value={profile.email} 
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  required 
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">Salvar Dados</button>
              </div>
            </form>

            <hr className="divider" />

            <h2>Alterar Senha</h2>
            <form onSubmit={handlePasswordSubmit} className="form-grid">
              <div className="form-group full-width">
                <label>Senha Atual</label>
                <input 
                  type="password" 
                  value={passwords.atual}
                  onChange={(e) => setPasswords({ ...passwords, atual: e.target.value })}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Nova Senha</label>
                <input 
                  type="password" 
                  value={passwords.nova}
                  onChange={(e) => setPasswords({ ...passwords, nova: e.target.value })}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Confirmar Nova Senha</label>
                <input 
                  type="password" 
                  value={passwords.confirmar}
                  onChange={(e) => setPasswords({ ...passwords, confirmar: e.target.value })}
                  required 
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">Atualizar Senha</button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'consultas' && (
          <div className="card">
            <h2>Consultas Agendadas</h2>
            {consultas.length === 0 ? (
              <p className="empty-state">Você não possui nenhuma consulta agendada.</p>
            ) : (
              <table className="consultas-table">
                <thead>
                  <tr>
                    <th>Profissional / Especialidade</th>
                    <th>Data e Hora</th>
                    <th>Status</th>
                    <th className="text-right">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {consultas.map((item) => (
                    <tr key={item.id}>
                      <td><strong>{item.medico}</strong></td>
                      <td>{item.data} às {item.hora}</td>
                      <td>
                        <span className={`status-badge ${item.status ? item.status.toLowerCase() : ''}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="text-right">
                        <button 
                          className="btn-danger-text" 
                          onClick={() => handleCancelarConsulta(item.id)}
                        >
                          Cancelar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default PainelDoUsuario;