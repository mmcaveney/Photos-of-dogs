// 
// // and select "Open with Live Server"
// // steps for the assessment

// // 1 Get the geographic location from the browser
// // 2 Construct the query URL
// // 3 Use fetch to send the request to Flickr
// // 4 Process the response data into an object
// // 5 Use the values in the response object to construct an image source URL
// // 6 Display the first image on the page
// // 7 In response to some event (e.g. a button click or a setInterval), show the next image in the collection
// A. Get location that we want to see photos of
//   1. use Geolocation API to get coordinates (lat and lon) or use a fallback location
// 	- [ this is a link to the documentation ]
// B. Get photo info from Flickr
//   1. use fetch() to send a GET request to flickr.com/services/rest
// 	- Include the lat and lon
// 	- Include a search term
//   2. Process the promises to get the photo data
// 	- Convert JSON to a usable object ("rehydrate")
// 	- Send the photo data to a display function
// C. Display photos
//   1. Create the image URLs from the photo data (function)
// 	- https://www.flickr.com/services/api/misc.urls.html
//   2. Insert an <img> tag into the page
// 	- crate an img element
// 	- set src attribute to image URL
// 	- append the element to the right place in the document
//   3. Display link to the image's Flickr page (function)
// 	- (Same stuff as the img tag)
// D. Provide a way to advance through photos

// // Your Code Here.

// // let myLocation = navigator.geolocation.getCurrentPosition
// // console.log(myLocation)

// // api key e5a39c6410bf8b2f6c9781a4855da6cc
// // secret 895fd31b51b526de

// // onGeolocationSuccess(data)

let photoContainer = []
let currentPictureIndex = 0
let div = document.createElement('div')
div.id = ("photoContainer")
let button = document.createElement('button')
button.id = "next"
button.innerText = "Next"
let photos = document.createElement('img')
let h1 = document.createElement('h1')
h1.innerText = "Doggos"
let img= document.createElement('img')
div.append(img)
document.body.append(h1,button, div)

const backupLocation = {latitude: 40.121139199999995, longitude: -104.8870912}


function useCurrentLocation(pos) {
    console.log("using actual location" + location.latitude + ", "+ location.longitude)
    console.log(pos)
    getPhotos(pos.coords)
}

function assemblePhotoSourceUrl (photoObj) {
    return "https://farm" + photoObj.farm +
            ".staticflickr.com/" + photoObj.server +
            "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
}

function slideShow(photoObj){
for(let photos of photoObj.photos.photo){
        photoContainer.push(photos)
    }
   img.src = assemblePhotoSourceUrl(photoContainer[currentPictureIndex])
    document.getElementById('next').addEventListener('click',showNextPicture => { 
        currentPictureIndex += 1
        if (photoContainer[currentPictureIndex]){
            img.src = assemblePhotoSourceUrl(photoContainer[currentPictureIndex])
        }else{currentPictureIndex = 0
            img.src = assemblePhotoSourceUrl(photoContainer[0])
        }
    })
}
// function showPhotos(data){
    
//     console.log(data)
//     photosArray = data.photos.photo
//     console.log(assemblePhotoSourceUrl(photosArray[0]))
    
// }

// 
// function processResponse(response){
//     let responsePromise = response.json()
//     responsePromise.then(showPhotos)}

function getPhotos(){
    let url = 'https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=e5a39c6410bf8b2f6c9781a4855da6cc&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=40.121139199999995&lon=-104.8870912&text=dog'
    
    let fetchPromise = fetch(url)
    fetchPromise
        .then(processResponse => processResponse.json())
        .then(slideShow)
        console.log(fetchPromise)
}
function error (){
    console.log("error!")
    getPhotos(backupLocation)
}

navigator.geolocation.getCurrentPosition(useCurrentLocation, error)
