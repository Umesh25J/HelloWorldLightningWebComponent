import { LightningElement,wire,api,track } from 'lwc';
import displayAccount from '@salesforce/apex/AccountContact.displayAccount';
import deleteContactHandler from '@salesforce/apex/MultiRecordCreationHandler.deleteContactHandler';
import insertContactData from '@salesforce/apex/MultiRecordCreationHandler.saveContactData';
export default class accountContactDirectory extends LightningElement {  
    areDetails=true;
    @track totalAccounts;
    @track visibleAccounts;
    @track blankRow = [];
    @api recordId;
    @track index = 0;
    @track selectedAccount;
    @track selectedContact;
    @track editClick=false;

    @wire(displayAccount)
    wiredContact({error, data}){
        if(data){ 
            this.totalAccounts = data
        }
        if(error){
            console.error(error)
        }
    }

    updateAccountHandler(event){
        this.visibleAccounts=[...event.detail.records]
        console.log(event.detail.records)
    }

    hideModalBox(event){
        this.editClick=false;
    }
    deleteRecord(event){
        this.selectedContact=event.target.name;
        deleteContactHandler({conId: this.selectedContact, accId: this.selectedAccount}).then(result => {
        }).catch(error => {
            window.alert(JSON.stringify(error));
        })
        eval("$A.get('e.force:refreshView').fire();");
    }
    editRecord(event){
        this.editClick=true;
        //this.selectedContact=event.target.name;
        console.log('hello');
        this.selectedContact=event.target.name;
        // deleteContactHandler({conId: this.selectedContact, accId: this.selectedAccount}).then(result => {
        // }).catch(error => {
        //     window.alert(JSON.stringify(error));
        // })
    }

    addRow(event){
        this.selectedAccount=event.target.name;
        this.index++;
        let i = this.index;
        let newContact = new Object();
        let blankRow = this.blankRow;
        newContact.Id = i;
        newContact.isChecked = false;
        blankRow.push(newContact);
        this.blankRow = blankRow; 
    }

    removeRow(event){
        const eventName = event.target.name;
        let blankRow = this.blankRow;
        if(eventName === 'multipleRowRemoval'){
            for(let i = 0; i < blankRow.length; i++){
                    blankRow.splice(i, 1);
                    i--;
            }
        }else{
            blankRow.splice(event.target.value, 1);
        }
        this.blankRow = blankRow;
    }

    setFirstName(event){
        const eventName = event.target.name;
        let blankRow = this.blankRow;
        blankRow[eventName].FirstName = event.target.value;
        this.blankRow = blankRow;
    }

    setLastName(event){
        const eventName = event.target.name;
        let blankRow = this.blankRow;
        blankRow[eventName].LastName = event.target.value;
        this.blankRow = blankRow;
    }

    saveData(event){
        let blankRow = this.blankRow;
        let contactDataList = [];
        for(let i = 0; i < blankRow.length; i++){
            if(blankRow[i] !== undefined ){
                let conData = new Object();
                conData.AccountId = this.selectedAccount;
                conData.FirstName = blankRow[i].FirstName;
                conData.LastName = blankRow[i].LastName;
                contactDataList.push(conData);
            }
        }
        if(contactDataList.length > 0){
            insertContactData({contactDataString: JSON.stringify(contactDataList)}).then(result => {
                
            }).catch(error => {
                window.alert('Please contact system admin: ' + JSON.stringify(error));
            })
        }else{
            window.alert('Please select any row to insert data.');
        }
        eval("$A.get('e.force:refreshView').fire();");
    }
    
}
