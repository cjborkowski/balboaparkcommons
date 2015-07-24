function PEvent()
{
	//Public vars
	
	// Private vars
	var eventHandlers = {};
	var eventNames = arguments;

	// Public methods
	this.addEventHandler = addEventHandler;
	this.removeEventHandler = removeEventHandler;
	this.executeEvent = executeEvent;
		

	// Methods

	function init()
	{
		for( var i=0; i<eventNames.length; i++ )
		{
			eventHandlers[eventNames[i]] = [];
		}
	}
	init();
	
	/***
	 * Adds an event handler
	 * @eventName string name of the event
	 * @handler function method to run when event is triggered
	 * @thisobj object context of handler (thisobj will be the "this" within handler)
	 */
	function addEventHandler(eventName, handler, thisobj)
	{
		if( $.isArray(eventHandlers[eventName]) && $.isFunction(handler) )
		{
			eventHandlers[eventName].push([handler,thisobj]);
		}
		
	}
	
	/***
	 * Removes an event handler
	 * @eventName string name of the event
	 * @handler function method to remove. Must be the same as the method that was used in addEventHandler
	 */	
	function removeEventHandler(eventName, handler)
	{
		
	}

	/***
	 * Executes an event
	 * @eventName string name of the event to be triggered
	 */		
	function executeEvent(eventName)
	{
		if( $.isArray(eventHandlers[eventName]) )
		{
			for( var i=0; i<eventHandlers[eventName].length; i++ )
			{
				try{
					eventHandlers[eventName][i][0].apply(eventHandlers[eventName][i][1],[eventName]);
				}
				catch(e)
				{
					throw e;
				}
			}
		}
	}
}

