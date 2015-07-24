<?php

class PFactory
{
	
	private static $_api;	
	private static $_umo;
	private static $_profile;
	private static $_category;
	private static $_cc;
	private static $_lightbox;
	private static $_thesaurus;
	
	public static function setAjax($api)
	{		
		self::$_api = $api;
	}

	public static function getUmoInstance()
	{
		if(self::$_umo==NULL)
		{
			App::import('Vendor', 'Umo', array('file'=>'Piction/Umo.php'));
			self::$_umo = new Umo(self::$_api);			
		}
		return self::$_umo;							
	}
	
	public static function getCategoryInstance()
	{			
		if(self::$_category==NULL)
		{
			App::import('Vendor', 'Category', array('file'=>'Piction/Category.php'));
			self::$_category = new Category(self::$_api);
		}
		return self::$_category;		
	}	
	
			
	public static function getProfileInstance()
	{			
		if(self::$_profile==NULL)
		{
			App::import('Vendor', 'Profile', array('file'=>'Piction/Profile.php'));
			self::$_profile = new Profile();
		}
		return self::$_profile;		
	}
	
	public static function getLightboxInstance()
	{
	 	if(self::$_lightbox==NULL)
		{
			App::import('Vendor', 'Lightbox', array('file'=>'Piction/Lightbox.php'));
			self::$_lightbox = new Lightbox(self::$_api);			
		}
		return self::$_lightbox;	
	}
	
	
	
	public static function getCommandcentreInstance()
	{			
		if(self::$_umo==NULL)
		{
			App::import('Vendor', 'Umo', array('file'=>'Piction/Umo.php'));
			self::$_umo = new Umo($this->API);
		}
		return self::$_umo;		
	}
	
	public static function getThesaurusInstance()
	{			
		if(self::$_thesaurus==NULL)
		{
			App::import('Vendor', 'Thesaurus', array('file'=>'Piction/Thesaurus.php'));
			self::$_thesaurus = new Thesaurus(self::$_api);
		}
		return self::$_thesaurus;		
	}
}

?>