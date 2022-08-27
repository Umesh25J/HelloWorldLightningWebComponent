import { LightningElement,api,wire } from 'lwc';
import fetchWeatherInfo from "@salesforce/apex/WeatherCtrl.fetchWeatherInfo";
import accountRecords from '@salesforce/apex/AccountContact.getRelatedAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class WeatherLwcComponent extends LightningElement {
    @api recordId;
    showSpinner = false;
    countryName;
    zipCode;
    result={};
    connectedCallback(){
        accountRecords({accId : this.recordId}).then(result1 => {
            this.countryName=result1[0].BillingCountry;
            this.zipCode=result1[0].BillingPostalCode;
            this.handleValidation();
        }).catch(error => {
            console.log(error);
        }) 
    }

    handleValidation(event) {
            this.handleSpinner();
            //send data to server side to check wetaher
            fetchWeatherInfo({zipCode : this.zipCode, countryCode : this.countryName})
            .then(result => {
                //do something
                //console.log(result.name);
                result.temp = (result.temp - 274.15).toFixed(2);
                result.sunset = this.convertUnixToTime(result.sunset);
                result.sunrise = this.convertUnixToTime(result.sunrise);
                this.result = result;
 
                this.handleSpinner();
            })
            .catch((error) => {
                //Let's send the user a toast with our custom error message
                const evt = new ShowToastEvent({
                    title: "Yikes!",
                    message: error.body.message,
                    variant: "error",
                });
                this.dispatchEvent(evt);
                this.handleSpinner();
            })
    }
    convertUnixToTime(unixtimestamp){
        console.log(unixtimestamp);
        var dt = unixtimestamp * 1000;
        var myDate = new Date(dt);
        console.log(myDate);
        return(myDate.toLocaleString());
    }
    handleSpinner(){
        this.showSpinner = !this.showSpinner;
    }
}