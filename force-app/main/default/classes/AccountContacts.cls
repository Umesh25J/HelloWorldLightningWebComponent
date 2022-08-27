public with sharing class AccountContacts {

    @AuraEnabled(cacheable= true)
    public static List<Account> displayAccount(){
        //get records from database and store in list Step 2fgdfsgdfs
        return [SELECT Name,Id,Phone,Type,(Select id,Name,FirstName,LastName,Email,Phone from Contacts) FROM Account WITH security_enforced]; 
    }
    @AuraEnabled
    public static List<Account> getRelatedAccounts(String accId){
        return [Select Id,Phone,BillingCountry,BillingPostalCode FROM Account WHERE Id = :accId];
    }
}
