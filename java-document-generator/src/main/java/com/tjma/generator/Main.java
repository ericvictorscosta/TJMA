package com.tjma.generator;

import com.google.gson.Gson;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;

import java.io.*;
import java.text.NumberFormat;
import java.util.Locale;

public class Main {
    public static void main(String[] args) {
        if (args.length != 1) {
            System.err.println("Esperado 1 argumento (JSON do processo).");
            System.exit(1);
        }

        try {
            String json = args[0].replace("\\\"", "\"");
            Gson gson = new Gson();
            Processo processo = gson.fromJson(json, Processo.class);

            String tempDir = System.getProperty("java.io.tmpdir");
            String fileName = "alvara_" + processo.getId() + ".pdf";
            String filePath = tempDir + File.separator + fileName;
            Document doc = new Document(PageSize.A4);
            PdfWriter.getInstance(doc, new FileOutputStream(filePath));
            doc.open();

            Font titleFont = new Font(Font.HELVETICA, 18, Font.BOLD);
            Font boldFont = new Font(Font.HELVETICA, 12, Font.BOLD);
            Font normalFont = new Font(Font.HELVETICA, 12, Font.NORMAL);

            doc.add(new Paragraph("ALVARÁ DE PAGAMENTO", titleFont));
            doc.add(new Paragraph(" "));

            doc.add(new Paragraph("Processo Nº: " + processo.getNumero(), boldFont));
            doc.add(new Paragraph("Classe: " + processo.getClasse(), normalFont));
            doc.add(new Paragraph("Status: " + processo.getStatus(), normalFont));
            doc.add(new Paragraph("Valor da Causa: " + formatarMoeda(processo.getValorCausa()), normalFont));
            doc.add(new Paragraph("Partes: " + String.join(" x ", processo.getPartes()), normalFont));
            doc.add(new Paragraph("Juiz(a) Responsável: " + processo.getJuiz(), normalFont));
            doc.add(new Paragraph(" "));

            doc.add(new Paragraph("Este documento foi gerado automaticamente pelo sistema Painel de Gestão e Automação Judicial.", normalFont));

            doc.close();

            System.out.println(filePath);

        } catch (Exception e) {
            e.printStackTrace();
            System.exit(2);
        }
    }

    private static String formatarMoeda(double valor) {
        NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));
        return nf.format(valor);
    }
}