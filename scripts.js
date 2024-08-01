// 假设你有一个包含视频URL和其对应的缩略图URL的数组

let videoData=[];
for(let i=1;i<=551;i++){
    videoData.push({videoUrl:`小王很哇塞的抖音 - 抖音(${i}).mp4`})
}

// // 动态插入视频并添加点击事件监听器
// for (var i = 0; i < videoData.length; i++) {
//     var videoElement = document.createElement('video');
//     videoElement.src = videoData[i].videoUrl;
//     // videoElement.poster = videoData[i].thumbnailUrl;
//     videoElement.classList.add('preview-video');
//     videoElement.muted = true;
//     videoElement.playsInline = true;

//     videoElement.addEventListener('click', function (event) {
//         // 获取当前点击视频的src属性值
//         var videoUrl = event.target.src;
//         // 跳转到新页面并将视频地址作为URL参数传递
//         window.location.href = 'preview.html?video=' + encodeURIComponent(videoUrl);
//     });

//     document.querySelector('.container').appendChild(videoElement);
// }


// 懒加载
// 首先确保浏览器支持Intersection Observer API
// if ('IntersectionObserver' in window) {
//     // 创建一个Intersection Observer实例
//     var observer = new IntersectionObserver(function (entries, observer) {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) { // 当元素进入视口时
//                 // 触发预加载并移除观察者，防止重复加载
//                 entry.target.load();
//                 observer.unobserve(entry.target);
//             }
//         });
//     }, { threshold: 0.5 }); // 设置阈值为0.5，表示当视频元素50%出现在视口中时触发加载

//     // 遍历所有视频元素，并添加观察者
//     for (var i = 0; i < videoData.length; i++) {
//         var videoElement = document.createElement('video');
//         videoElement.src = 'xw/' + videoData[i].videoUrl;
//         // videoElement.poster = videoData[i].thumbnailUrl;
//         videoElement.classList.add('preview-video');
//         videoElement.muted = true;
//         videoElement.autoplay = true;
//         videoElement.loop = true;
//         videoElement.playsInline = true;
//         // videoElement.load();
//         videoElement.addEventListener('click', function (event) {
//             // 获取当前点击视频的src属性值
//             var videoUrl = event.target.src;
//             // 跳转到新页面并将视频地址作为URL参数传递
//             window.location.href = 'preview.html?video=' + encodeURIComponent(videoUrl);
//         });

//         // 将视频元素添加到DOM中
//         document.querySelector('.container').appendChild(videoElement);

//         // 添加Intersection Observer观察者
//         observer.observe(videoElement);
//     }
// } else {
//     // 如果浏览器不支持Intersection Observer，则可以使用滚动事件监听等兼容性方案
//     console.log('当前浏览器不支持Intersection Observer API');
// }



// 懒加载2  一个个渲染加载
// let currentIndex = 0;

// function loadNextVideo() {
//     if (currentIndex < videoData.length) {
//         var videoElement = document.createElement('video');
//         videoElement.src = 'xw/' + videoData[currentIndex].videoUrl;
//         // videoElement.poster = videoData[i].thumbnailUrl;
//         videoElement.classList.add('preview-video');
//         videoElement.muted = true;
//         // videoElement.autoplay = true;
//         // videoElement.loop = true;
//         videoElement.playsInline = true;

//         videoElement.addEventListener('canplaythrough', function () {
//             currentIndex++;
//             loadNextVideo();
//         });

//         videoElement.addEventListener('click', function (event) {
//             var videoUrl = event.target.src;
//             window.location.href = 'preview.html?video=' + encodeURIComponent(videoUrl);
//         });

//         document.querySelector('.container').appendChild(videoElement);

//         observer.observe(videoElement);
//     }
// }

// loadNextVideo();


// 懒加载3
let loadedIndex = 0;
const observerOptions = { threshold: 0.5 };

// 创建并观察所有视频元素
function createAndObserveAllVideos() {
    for (let i = 0; i < videoData.length; i++) {
        const videoElement = document.createElement('video');
        videoElement.dataset.index = i;
        videoElement.classList.add('preview-video');
        videoElement.muted = true;
        videoElement.autoplay = true;
        videoElement.playsInline = true;
        videoElement.loop = true;

        // 视频点击事件处理
        videoElement.addEventListener('click', function(event) {
            var videoUrl = 'xw/' + videoData[event.target.dataset.index].videoUrl;
            window.location.href = 'preview.html?video=' + encodeURIComponent(videoUrl);
        });

        document.querySelector('.container').appendChild(videoElement);

        // 使用Intersection Observer观察视频元素
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.src) {
                    entry.target.src = 'xw/' + videoData[entry.target.dataset.index].videoUrl;
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(videoElement);
    }
}

createAndObserveAllVideos();




// 预加载
// for (var i = 0; i < videoData.length; i++) {
//     var videoElement = document.createElement('video');
//     videoElement.src = videoData[i].videoUrl;
//     // videoElement.poster = videoData[i].thumbnailUrl;
//     videoElement.classList.add('preview-video');
//     videoElement.muted = true;
//     videoElement.playsInline = true;

//     // 添加预加载
//     videoElement.load();

//     videoElement.addEventListener('click', function (event) {
//         // 获取当前点击视频的src属性值
//         var videoUrl = event.target.src;
//         // 跳转到新页面并将视频地址作为URL参数传递
//         window.location.href = 'preview.html?video=' + encodeURIComponent(videoUrl);
//     });

//     // 将视频元素添加到DOM中
//     document.querySelector('.container').appendChild(videoElement);
// }



