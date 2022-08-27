({
    lwcEventHandler : function(component, event, helper) {
        var eventData=event.getParam('v');
        component.set("v.txtFromEvent",eventData)
    }
})
