# MANFREDjs


Hi, I'm Manfred, your kick-ass, easy to use overlayer plugin for jQuery.  
No rocketscience, no crazy scripting skills required.   
Just one line, leaves more time to party.

```javascript
$('a').manfred();
```


## Easy to adapt

Lots of settings, lots of fun.  

```javascript
$('a').manfred({
	autosize: true,
	bgclose: true,
    bgcolor: '#888888',
    bgopacity: '60',
    delay : 200,
	escape : true,
	height: 'auto',
	position: 'center',
	scroll : false,
	speed : 200,
	width: 400
});
```
## Settings
### Layout
**bgcolor**  
Background color of the overlay, rgba and hex are supported

```javascript
bgcolor: hex | rgb | rgba
```
**bgopacity**  
Opacity of the background color. only used when bcolor is hex

```javascript
bgopacity: '60'
```

**position**  
Where does Manfred stay?

```javascript
position: 'center' | 'iframe'
```

### Events 
**escape**  
Enable/disable the escape key to close Manfred

```javascript
escape: boolean
```

**bgclose**  
Enable/disable closing Manfred by clicking on the overlay

```javascript
bgclose: boolean
```

### Dimensions
**autosize**  
Set dimensions according to content

```javascript
autosize: boolean
```

**By data attribute**  
Fixed widths can be set by adding data-manfred-width and/or data-manfred-height on the element

```html
<a href="#" data-manfred-width="600" data-manfred-height="600">
	click
</a>
```

**On init**  
Default dimensions can be set on init

```javascript
width: auto | px
height: auto | px
```

### Other settings
**scroll**  
Enable scroll inside Manfred

```javascript
scroll: boolean
```

**speed**  
Set the fade in/out speed

```javascript
speed: 100
```

**delay**  
The delay before Manfred disappears

```javascript
delay: 100
```