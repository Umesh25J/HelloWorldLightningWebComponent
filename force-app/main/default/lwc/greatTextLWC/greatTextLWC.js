import { LightningElement, track } from 'lwc';

export default class greatTextLWC extends LightningElement {
    @track greeting= "Apex Hours";
    greetUser(event){
        let txtInput = this.template.querySelector(".txtInput");
        this.greeting=txtInput.value;
    }
}