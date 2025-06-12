package com.tjma.generator;

import java.util.List;

public class Processo {
    private int id;
    private String numero;
    private String status;
    private String classe;
    private List<String> partes;
    private double valorCausa;
    private String juiz;

    // Getters
    public int getId() { return id; }
    public String getNumero() { return numero; }
    public String getStatus() { return status; }
    public String getClasse() { return classe; }
    public List<String> getPartes() { return partes; }
    public double getValorCausa() { return valorCausa; }
    public String getJuiz() { return juiz; }

    // Setters (obrigatório para o Gson)
    public void setId(int id) { this.id = id; }
    public void setNumero(String numero) { this.numero = numero; }
    public void setStatus(String status) { this.status = status; }
    public void setClasse(String classe) { this.classe = classe; }
    public void setPartes(List<String> partes) { this.partes = partes; }
    public void setValorCausa(double valorCausa) { this.valorCausa = valorCausa; }
    public void setJuiz(String juiz) { this.juiz = juiz; }
}