public with sharing class ApexHoursDemoClass {
    public ApexHoursDemoClass() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(){    
            return [SELECT Id,Name,Email FROM Contact LIMIT 20];
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(){    
            return [SELECT Id,Name FROM Account LIMIT 20];
    }
}