import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  type: string = "peding";

  constructor(public alertController: AlertController, 
    public taskService: TaskService,
    public toastController: ToastController) {}

  async presentAlertPromptAdd() {
    const alert = await this.alertController.create({
      header: 'Adicionar Tarefa!',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Tarefa'
        },
        // input date with min & max
        {
          name: 'date',
          type: 'date',
          min: '2022-01-01',
          max: '2025-01-31'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Salvar',
          handler: (alertData) => {
            if (alertData.task != "")
              this.taskService.addTask(alertData.task, alertData.date);
            else {
              this.presentToast();
              this.presentAlertPromptAdd();
            }
            }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertPromptDelete(index: number) {
    const alert = await this.alertController.create({
      header: 'Ecluir Tarefa!',
      
      message: 'Deseja realmente excluir essa tarefa?',

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Excluir',
          handler: (alertData) => {
            this.taskService.delTask(index);
            }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertPromptUpdate(index: number, task) {
    const alert = await this.alertController.create({
      header: 'Atualizar Tarefa!',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Tarefa',
          value: task.value
        },
        // input date with min & max
        {
          name: 'date',
          type: 'date',
          min: '2022-01-01',
          max: '2025-01-31',
          value: task.date.getFullYear() + "-" + ((task.date.getMonth()+ 1) < 10 ? "" + task.date.getMonth()+ 1 : task.date.getMonth()+ 1) + "-" + ((task.date.getDay()) < 10 ? "" + task.date.getDay() : task.date.getDay())
          
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Salvar',
          handler: (alertData) => {
            if (alertData.task != "")
              this.taskService.updateTask(index, alertData.task, alertData.date);
            else {
              this.presentToast();
              this.presentAlertPromptAdd();
            }
            }
        }
      ]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "preencha a tarefa!",
      duration: 2000
    });
    toast.present();
  }

}
