'use strict';

var assert = require('assert');

var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var chromeDriver = require('selenium-chromedriver');

var port = process.env.NODE_TEST_PORT || 8002;

before(function(done) {
  require('./server')(__dirname + '/..', port, done);
  chrome.setDefaultService(
    new chrome.ServiceBuilder(chromeDriver.path).build()
  );
});

beforeEach(function(){
 this.driver = new webdriver.Builder().
   withCapabilities(webdriver.Capabilities.chrome()).
   build();
   this.timeout(0);
   return this.driver.get('http://localhost:' + port);
});

afterEach(function(){ 
   return this.driver.quit();
});

it('includes the application name in the page title',function(){
this.timeout(1000);

		return this.driver.getTitle().then(function(titleText){
		 //assert.equal(titleText,'TodoMVC');
		 assert(/TodoMVC/.test(titleText));
		});
});

it('add new items to the list', function(){
var driver= this.driver;
 return driver.findElement(webdriver.By.css('#new-todo'))
 .then(function(textInput){
  textInput.sendKeys('clean Batmobile',webdriver.Key.ENTER)
 }).then(function(){
  return driver.findElements(webdriver.By.css('#todo-list li')); 
 }).then(function(items){
  assert.equal(items.length,1);
  return items[0].getText();  
  }).then(function(text){
  assert.equal( text , 'clean Batmobile');
 });
 });
 
 it('updates "items left" new items to the list', function(){
var driver= this.driver;
 return driver.findElement(webdriver.By.css('#new-todo'))
 .then(function(textInput){
  return textInput.sendKeys('clean Batmobile 2',webdriver.Key.ENTER)
  }).then(function(){
  return driver.findElement(webdriver.By.css('span#todo-count strong'))
  }).then(function(item){
  return item.getText();
  }).then (function(text){ 
  assert.equal( text , '1');
  });
 
 });
 
 it('updates "items left" new items to the list', function(){
var driver= this.driver;
 return driver.findElement(webdriver.By.css('#new-todo'))
 .then(function(textInput){
  return textInput.sendKeys('clean Batmobile 2',webdriver.Key.ENTER)
  }).then(function(){
  return driver.findElement(webdriver.By.css('span#todo-count strong'))
  }).then(function(item){
  return item.getText();
  }).then (function(text){ 
  assert.equal( text , '1');
  });
 
 });

 
