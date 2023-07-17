import { format } from 'date-fns';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

function ImprimiOSFechada(informacoes) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const dataEntradaFormatada = (data) => {
        const dataConvertida = format(new Date(data), 'dd/MM/yyyy HH:mm');
        return dataConvertida
    }


    const docConfig = {

        pageSize: {
            width: 400,
            height: 'auto'
        },
        defaultFileName: 'teste',
        content: [
            { text: 'LOJA TROCA VIDRO', style: 'centralizado' },
            { text: 'CNPJ:30/256.127/0001-26', style: 'centralizado' },
            { text: 'Rua Quinze de Novembro, 666, Centro', style: 'centralizado' },
            { text: 'Loja 96', style: 'centralizado' },
            { text: '96015-000 - Pelotas RS', style: 'centralizado' },
            { text: '(53)98135-3176', style: 'centralizado' },
            { text: '================================================', style: 'centralizado' },
            { text: `ORDEM DE SERVIÇO Nº ${informacoes.id}`, style: 'centralizado' },
            { text: '================================================', style: 'centralizado' },
            { text: `Data Entrada: ${dataEntradaFormatada(informacoes.createdAt)}`, style: 'esquerda' },
            { text: `Cliente: ${informacoes.ordemServico.client.name}`, style: 'esquerda' },
            { text: `Número: (53)${informacoes.ordemServico.client.number}`, style: 'esquerda' },
            { text: `Data Saida: ${dataEntradaFormatada(informacoes.ordemServico.withdrawal)}`, style: 'esquerda' },
            { text: '================================================', style: 'centralizado' },
            { text: `Marca: ${informacoes.ordemServico.DeviceModel.DeviceBrand.devicebrand}      Modelo:${informacoes.ordemServico.DeviceModel.devicemodel}`, style: 'centralizado' },
            { text: `Serviço: ${informacoes.ordemServico.service.service}`, style: 'centralizado' },
            { text: `Observações: ${informacoes.ordemServico.observation}`, style: 'centralizado' },
            { text: `Valor: R$${Number(informacoes.ordemServico.value).toFixed(2)}`, style: 'centralizado' },
            { text: '================================================', style: 'centralizado' },
            { text: `Termos de garantia`, style: 'esquerda' },
            { text: `- Garantia de 90 dias sobre o serviço executado, desde a data de entrega do aparelho;`, style: 'esquerda' },
            { text: `- A garantia não cobre mau uso, como em caso de quebrar, molhar, entre outros;`, style: 'esquerda' },
            { text: `- O cliente perderá a garantia caso o aparelho sofra reparos por outro técnico, danos e/ou violações;`, style: 'esquerda' },
            { text: `- A garantia é válida somente para o item ou serviço descrito na ordem de serviço não abrangendo outras partes;`, style: 'esquerda' },
            { text: `- Utilize o aparelho sempre com capa e pelicula;`, style: 'esquerda' },
        ],

        styles: {
            header: {
                fontSize: 22,
                bold: true
            },
            esquerda: {
                marginLeft: 10,

                alignment: 'left'
            },
            centralizado: {
                alignment: 'center'
            }
        }
    }


    pdfMake.createPdf(docConfig).open();
    //pdfMake.createPdf(docConfig).download()

}
export default ImprimiOSFechada;