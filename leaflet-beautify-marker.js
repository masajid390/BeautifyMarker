/*
  Leaflet.BeautifyMarker, a plugin that adds colorful iconic markers for Leaflet by giving full control of style to end user, It has also ability to adjust font awesome
  and glyphicon icons
  (c) 2016-2017, Muhammad Arslan Sajid
  http://leafletjs.com
*/

/*
* Leaflet.BeautifyIcon assumes that you have already included the Leaflet library.
*/
L.BeautifyMarker = L.Marker.extend({

    registerMapZoomendEvent: false,

    options: {
        icon: L.BeautifyIcon.icon()
    },

    onAdd: function (map) {
        L.Marker.prototype.onAdd.call(this, map);

        if (this.options && this.options.icon && this.options.icon.options && this.options.icon.options.iconShape === 'marker') {
            var icon = this._icon;
            this._updateMarkerShapeIcon(icon);
            if (!this.registerMapZoomendEvent) {
                L.DomEvent.addListener(map, 'zoomend', this._onMapZoomChange, this);
                L.DomEvent.addListener(this, 'drag', this._onMarkerDrag, this);
                this.registerMapZoomendEvent = true;
            }
        }
    },
    
    _onMarkerDrag:function(){
        
        this._updateMarkerShapeIcon(this._icon);
    },
    
    _onMapZoomChange: function () {

        var needToRotateIcons = document.getElementsByClassName('marker');
        for (var i = 0, length = needToRotateIcons.length; i < length; i++) {
            var icon = needToRotateIcons[i];
            this._updateMarkerShapeIcon(icon);
        }
    },

    _updateMarkerShapeIcon: function (icon) {

        var transform = icon.style.transform;
        icon.style.transform = transform + ' rotate(45deg)';
        icon.firstChild.style.transform = 'rotate(315deg)';
    }
});

L.BeautifyMarker.marker = function (latlng, options) {

    return new L.BeautifyMarker(latlng, options);
}