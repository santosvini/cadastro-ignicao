package net.igrejadacidade.ignicao.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "crianca")
public class CriancaModel implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idcrianca")
	private long idCrianca;

	@Column(name = "nome")
	private String nome;

	@Column(name = "faixaetaria")
	private String faixaEtaria;

	@Column(name = "celular")
	private String celular;

	@Column(name = "responsavel")
	private String responsavel;

	public CriancaModel(){}

	public long getIdCrianca() {
		return idCrianca;
	}

	public void setIdCrianca(long idCrianca) {
		this.idCrianca = idCrianca;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getFaixaEtaria() {
		return faixaEtaria;
	}

	public void setFaixaEtaria(String faixaEtaria) {
		this.faixaEtaria = faixaEtaria;
	}

	public String getCelular() {
		return celular;
	}

	public void setCelular(String celular) {
		this.celular = celular;
	}

	public String getResponsavel() {
		return responsavel;
	}

	public void setResponsavel(String responsavel) {
		this.responsavel = responsavel;
	}
}
