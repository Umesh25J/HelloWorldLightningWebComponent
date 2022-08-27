import { LightningElement,api,wire } from 'lwc';
import getContactList from '@salesforce/apex/ApexHoursDemoClass.getContactList';
import getAccountList from '@salesforce/apex/ApexHoursDemoClass.getAccountList';
export default class FirstLwcAPD extends LightningElement {
    greeting='Welecome to apex Hours'
    inputText='';
    @api message='This is a simple message';
    result;//variable
    error;
    //@api recordId, sObjectName
    //@track - removed from latest release 20
    //Get a class
    //Create an AuraEnabled Method
    //import the method in LWC
    //use @wire to call the method//success data,error
    @wire(getContactList)
    wiredData({error,data}){
        if(data){
            this.result=data;
            this.error=undefined;
            window.console.log('Contact Records ',data);
        }
        else if(error){
            this.error=error;
            this.result=undefined;
            window.console.log('error ',error);
        }
    }

    handleClick(event){
        this.inputText=event.target.value;
        window.console.log('event.target',event.target);
    }

    handleSubmit(){
        alert('Button Clicked')
        getAccountList()
        .then(result =>{
            this.result=result;
            this.error=undefined;
        })
        .catch(error =>{
            this.eror=error;
            this.result=undefined;
        })
    }
}