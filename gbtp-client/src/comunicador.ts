/**
 * Classe responsável pela comunicação com o servidor via WebSocket.
 * Gerencia a conexão, envio de mensagens e tratamento de eventos do WebSocket.
 */
export class Comunicador{
  /** Socket WebSocket para comunicação com o servidor */
  private socket: WebSocket;
  /** Callback opcional para processar mensagens recebidas do servidor */
  public onMessage : ((response: string) => void) | undefined;

  /**
   * Inicializa uma nova instância do Comunicador.
   * Estabelece conexão com o servidor WebSocket e configura os manipuladores de eventos.
   */
  constructor(){
    this.socket = new WebSocket('ws://localhost:7001');
    
    //configurar os eventos do socket
    this.socket.onopen = () => {
      console.log('Conectado ao servidor.');
    };
    this.socket.onmessage = (event) => {
      if(this.onMessage){
        this.onMessage(event.data);
      }
      console.log(event.data + '\n');
    };
    this.socket.onclose = () => {
      console.log('Desconectado do servidor.');
    }
  }

  /**
   * Envia uma mensagem para o servidor.
   * @param mensagem - A mensagem a ser enviada para o servidor
   */
  public enviar(mensagem : string){
    this.socket.send(mensagem);
    console.log(`Mensagem enviada ao servidor:\n${mensagem}\n`);
  }

  /**
   * Sinaliza o encerramento da conexão com o servidor.
   * Envia uma mensagem vazia para indicar o encerramento.
   */
  public fechar(){
    this.socket.send('');
    console.log('Cliente sinalizou encerramento da conexão.');
  }
}
