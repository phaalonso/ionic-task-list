import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';

interface Tarefa {
  id: number;
  descricao: string;
  concluida: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public tarefa: Tarefa = {} as any;
  public tarefas: Tarefa[] = [];

  // Todos os serviços que são ejetados, precisam ser colocados como parametro no construtor
  constructor(private storage: StorageService) {
    this.storage.recuperar("tarefas").then(t => {if (t) this.tarefas = t});
  }

  adicionar() {
    if (!this.tarefa.descricao || this.tarefa.descricao.length === 0)
      return;
      
    this.tarefa.id = new Date().getTime();
    this.tarefa.concluida = false;
      
    this.tarefas.push(this.tarefa);
    console.log(this.tarefas);
    this.tarefa = {} as any;

    this.storage.armazenar("tarefas", this.tarefas);
  }

  concluida(id: number) {
    console.log("Oi");
    const tarf = this.tarefas.find((t) => t.id === id);
    tarf.concluida = !tarf.concluida;
    console.log(tarf);
  }

  excluir(id: number) {
    this.tarefas = this.tarefas.filter(item => item.id != id);
  }

}
