/**
 * Main JS file for project.
 */

/**
 * Define globals that are added through the js.globals in
 * the config.json file, here, mostly so linting won't get triggered
 * and its a good queue of what is available:
 */
// /* global $, _ */

/**
 * Adding dependencies
 * ---------------------------------
 * Import local ES6 or CommonJS modules like this:
 * import utilsFn from './shared/utils.js';
 *
 * Or import libraries installed with npm like this:
 * import module from 'module';
 */

// Dependencies
import utils from './shared/utils.js';

// DOM loaded
utils.documentReady(() => {
  // Mark page with note about development or staging
  utils.environmentNoting();
});




/**
 * Adding Svelte templates in the client
 * ---------------------------------
 * We can bring in the same Svelte templates that we use
 * to render the HTML into the client for interactivity.  The key
 * part is that we need to have similar data.
 *
 * First, import the template.  This is the main one, and will
 * include any other templates used in the project.
 *
 *   `import Content from '../templates/_index-content.svelte.html';`
 *
 * Get the data parts that are needed.  There are two ways to do this.
 * If you are using the buildData function to get data, then add make
 * sure the config for your data has a `local: "content.json"` property
 *
 *  1. For smaller datasets, just import them like other files.
 *     `import content from '../assets/data/content.json';`
 *  2. For larger data points, utilize window.fetch.
 *     `let content = await (await window.fetch('../assets/data/content.json')).json();`
 *
 * Once you have your data, use it like a Svelte component:
 *
 * utils.documentReady(() => {
 *   const app = new Content({
 *     target: document.querySelector('.article-lcd-body-content'),
 *     hydrate: true,
 *     data: {
 *       content
 *     }
 *   });
 * });
 */



// Common code to get svelte template loaded on the client and hack-ishly
// handle sharing
//
// import Content from '../templates/_index-content.svelte.html';
//
// utils.documentReady(() => {
//   // Deal with share place holder (remove the elements, then re-attach
//   // them in the app component)
//   const attachShare = utils.detachAndAttachElement('.share-placeholder');
//
//   // Main component
//   const app = new Content({
//     target: document.querySelector('.article-lcd-body-content'),
//     hydrate: true,
//     data: {
//       attachShare
//     }
//   });
// });

import mn from '../sources/mn.json';
import beforeFlights from '../sources/flights_old.json';
import afterFlights from '../sources/flights_new.json';

mapboxgl.accessToken = 'pk.eyJ1Ijoic3RhcnRyaWJ1bmUiLCJhIjoiY2sxYjRnNjdqMGtjOTNjcGY1cHJmZDBoMiJ9.St9lE8qlWR5jIjkPYd3Wqw';

var dzoom = 5.2;
var mzoom = 5.2;
var mobile_zoom = 5.2;
var center = [-94.021765, 46.619261];

//ZOOM BUTTON INITIALIZE
class CityReset {
  onAdd(map){
    this.map = map;
    this.container = document.createElement('div');
    this.container.className = 'mapboxgl-ctrl my-custom-control2 mapboxgl-ctrl-group';

    const button = this._createButton('mapboxgl-ctrl-icon StateFace monitor_button2')
    this.container.appendChild(button);
    return this.container;
  }
  onRemove(){
    this.container.parentNode.removeChild(this.container);
    this.map = undefined;
  }
  _createButton(className) {
    const el = window.document.createElement('button')
    el.className = className;
    el.textContent = 'W';
    // el.innerHTML = '<i class="far fa-building"></i>';
    el.addEventListener('click',(e)=>{
      e.style.display = 'none'
      console.log(e);
      // e.preventDefault()
      e.stopPropagation()
    },false )
    return el;
  }
}


//FLIGHTS MAP
var beforeMap1 = new mapboxgl.Map({
  container: 'before1',
  style: 'mapbox://styles/startribune/ck1b7427307bv1dsaq4f8aa5h',
  center: center,
  zoom: dzoom,
  minZoom: dzoom,
  maxZoom: 12,
  interactive: false
  });
   
var afterMap1 = new mapboxgl.Map({
  container: 'after1',
  style: 'mapbox://styles/startribune/ck1b7427307bv1dsaq4f8aa5h',
  center: center,
  zoom: dzoom,
  minZoom: dzoom,
  maxZoom: 12,
  interactive: false
  });

  // afterMap1.addControl(new mapboxgl.NavigationControl());

  beforeMap1.scrollZoom.disable();
  beforeMap1.doubleClickZoom.disable();
  beforeMap1.touchZoomRotate.disableRotation();
  beforeMap1.dragRotate.disable();

  afterMap1.scrollZoom.disable();
  afterMap1.doubleClickZoom.disable();
  afterMap1.touchZoomRotate.disableRotation();
  afterMap1.dragRotate.disable();

  const toggleControl1 = new CityReset();
  // afterMap1.addControl(toggleControl1,'top-right');

  //   $('.my-custom-control2').on('click', function(){
  //   afterMap1.jumpTo({
  //     center: center,
  //     zoom: dzoom,
  //   });
  // });

  var container1 = '#comparison-container1';
  var map1 = new mapboxgl.Compare(afterMap1, beforeMap1, container1, {});

  beforeMap1.on('load', function() {

    beforeMap1.addSource('mn', {
        type: 'geojson',
        data: mn
      });

      beforeMap1.addLayer({
            'id': 'mpls-layer',
            'interactive': true,
            'source': 'mn',
            'layout': {},
            'type': 'line',
            'paint': {
              'line-width': 1,
              'line-color': '#aaaaaa'
            }
      });

      beforeMap1.addSource('beforeFlights', {
        type: 'geojson',
        data: beforeFlights
      });

      // beforeMap1.addLayer({
      //     'id': 'beforeFlights-layer',
      //     'interactive': true,
      //     'source': 'beforeFlights',
      //     'layout': {},
      //     'type': 'circle',
      //      'paint': {
      //         'circle-opacity': 0.5,
      //         'circle-radius': 2,
      //         'circle-stroke-width': 1,
      //         'circle-stroke-color': '#333333',
      //         'circle-color': '#C28059'
      //      }
      // });

      beforeMap1.addLayer({
        'id': 'beforeFlights-layer',
        'type': 'line',
        'source': 'beforeFlights',
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
            'paint': {
            'line-color': '#7D739C',
            'line-width': 0.5,
            'line-opacity': 0.3
            }
        });

    });

  afterMap1.on('load', function() {

    afterMap1.addSource('mn', {
        type: 'geojson',
        data: mn
      });

    afterMap1.addLayer({
            'id': 'mpls-layer',
            'interactive': true,
            'source': 'mn',
            'layout': {},
            'type': 'line',
            'paint': {
              'line-width': 0.5,
              'line-color': '#aaaaaa'
            }
      });
  
      afterMap1.addSource('afterFlights', {
        type: 'geojson',
        data: afterFlights
      });

      // afterMap1.addLayer({
      //     'id': 'afterFlights-layer',
      //     'interactive': true,
      //     'source': 'afterFlights',
      //     'layout': {},
      //     'type': 'circle',
      //      'paint': {
      //         'circle-opacity': 0.5,
      //         'circle-radius': 2,
      //         'circle-stroke-width': 1,
      //         'circle-stroke-color': '#333333',
      //         'circle-color': '#C28059'
      //      }
      // });

      afterMap1.addLayer({
        'id': 'afterFlights-layer',
        'type': 'line',
        'source': 'afterFlights',
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
            'paint': {
            'line-color': '#7D739C',
            'line-width': 0.5,
            'line-opacity': 0.3
            }
        });

  });


//GREENHOUSE MAP
var beforeMap2 = new mapboxgl.Map({
  container: 'before2',
  style: 'mapbox://styles/startribune/ck1b7427307bv1dsaq4f8aa5h',
  center: center,
  zoom: dzoom,
  minZoom: dzoom,
  maxZoom: 12,
  interactive: false
  });
   
var afterMap2 = new mapboxgl.Map({
  container: 'after2',
  style: 'mapbox://styles/startribune/ck1b7427307bv1dsaq4f8aa5h',
  center: center,
  zoom: dzoom,
  minZoom: dzoom,
  maxZoom: 12,
  interactive: false
  });

  // afterMap2.addControl(new mapboxgl.NavigationControl());

  beforeMap2.scrollZoom.disable();
  beforeMap2.doubleClickZoom.disable();
  beforeMap2.touchZoomRotate.disableRotation();
  beforeMap2.dragRotate.disable();

  afterMap2.scrollZoom.disable();
  afterMap2.doubleClickZoom.disable();
  afterMap2.touchZoomRotate.disableRotation();
  afterMap2.dragRotate.disable();

  // const toggleControl2 = new CityReset();
  // afterMap2.addControl(toggleControl2,'top-right');

  //   $('.my-custom-control2').on('click', function(){
  //   afterMap2.jumpTo({
  //     center: center,
  //     zoom: dzoom,
  //   });
  // });

  var container2 = '#comparison-container2';
  var map2 = new mapboxgl.Compare(afterMap2, beforeMap2, container2, {});

  beforeMap2.on('load', function() {

    beforeMap2.addSource('mn', {
        type: 'geojson',
        data: mn
      });

      beforeMap2.addLayer({
            'id': 'mpls-layer',
            'interactive': true,
            'source': 'mn',
            'layout': {},
            'type': 'line',
            'paint': {
              'line-width': 1,
              'line-color': '#aaaaaa'
            }
      });

    });

  afterMap2.on('load', function() {

    afterMap2.addSource('mn', {
        type: 'geojson',
        data: mn
      });

    afterMap2.addLayer({
            'id': 'mpls-layer',
            'interactive': true,
            'source': 'mn',
            'layout': {},
            'type': 'line',
            'paint': {
              'line-width': 1,
              'line-color': '#aaaaaa'
            }
      });

    });


//LIGHTS MAP
// var beforeMap3 = new mapboxgl.Map({
//   container: 'before3',
//   style: 'mapbox://styles/startribune/ck1b7427307bv1dsaq4f8aa5h',
//   center: center,
//   zoom: dzoom,
//   minZoom: dzoom,
//   maxZoom: 12,
//   interactive: false
//   });
   
// var afterMap3 = new mapboxgl.Map({
//   container: 'after3',
//   style: 'mapbox://styles/startribune/ck1b7427307bv1dsaq4f8aa5h',
//   center: center,
//   zoom: dzoom,
//   minZoom: dzoom,
//   maxZoom: 12,
//   interactive: false
//   });

//   // afterMap3.addControl(new mapboxgl.NavigationControl());

//   beforeMap3.scrollZoom.disable();
//   beforeMap3.doubleClickZoom.disable();
//   beforeMap3.touchZoomRotate.disableRotation();
//   beforeMap3.dragRotate.disable();

//   afterMap3.scrollZoom.disable();
//   afterMap3.doubleClickZoom.disable();
//   afterMap3.touchZoomRotate.disableRotation();
//   afterMap3.dragRotate.disable();

//   // const toggleControl3 = new CityReset();
//   // afterMap3.addControl(toggleControl3,'top-right');

//   //   $('.my-custom-control2').on('click', function(){
//   //   afterMap3.jumpTo({
//   //     center: center,
//   //     zoom: dzoom,
//   //   });
//   // });

//   var container3 = '#comparison-container3';
//   var map3 = new mapboxgl.Compare(afterMap3, beforeMap3, container3, {});
   
//   beforeMap3.on('load', function() {

//     beforeMap3.addSource('mn', {
//         type: 'geojson',
//         data: mn
//       });

//       beforeMap3.addLayer({
//             'id': 'mpls-layer',
//             'interactive': true,
//             'source': 'mn',
//             'layout': {},
//             'type': 'line',
//             'paint': {
//               'line-width': 1,
//               'line-color': '#aaaaaa'
//             }
//       });

//     });

//   afterMap3.on('load', function() {

//     afterMap3.addSource('mn', {
//         type: 'geojson',
//         data: mn
//       });

//     afterMap3.addLayer({
//             'id': 'mpls-layer',
//             'interactive': true,
//             'source': 'mn',
//             'layout': {},
//             'type': 'line',
//             'paint': {
//               'line-width': 1,
//               'line-color': '#aaaaaa'
//             }
//       });

//     });

// map3.on('load', function() {

//     map3.addSource('mpls', {
//       type: 'geojson',
//       data: mpls
//     });

//     map3.addLayer({
//           'id': 'mpls-layer',
//           'interactive': true,
//           'source': 'mpls',
//           'layout': {},
//           'type': 'line',
//           'paint': {
//             'line-width': 0.7,
//             'line-color': '#aaaaaa'
//           }
//       });

//       map3.addSource('locations', {
//         type: 'geojson',
//         data: locations
//       });

//       map3.addLayer({
//         'id': 'arrest-layer',
//         'interactive': true,
//         'source': 'locations',
//         'layout': {},
//         'type': 'circle',
//          'paint': {
//             'circle-opacity': 0.5,
//             'circle-radius': 4,
//             'circle-stroke-width': 0,
//             'circle-stroke-color': '#C28059',
//             'circle-color': '#C28059'
//          }
//     });

// });