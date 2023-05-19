'use strict';
{

    class InstaVideo {

        index = 0

        isPlayed = false
        isErrored = false
        isLoading = false

        swiper
        allVideos

        length = 0

        onEnd = () => {
        }

        onError = () => {
        }

        onProgress = (progress) => {
        }

        onSliderEnd = () => {
        }

        sliderNext = event => {
            if (event && event.target.tagName === "A") {
                this.onSliderEnd()
                return;
            }
            if (!this.allVideos[this.swiper.activeIndex + 1]) {
                this.onSliderEnd()
                return
            }
            this.allVideos.forEach(elem => {
                elem.setPlay(false)
            })
            this.allVideos[this.swiper.activeIndex + 1].setPlay(true)
            this.swiper.slideNext()
            this.allVideos.forEach(elem => {
                elem.updateStyle()
            })
        }

        sliderBack = event => {
            if (event && event.target.tagName === "A") {
                this.onSliderEnd()
                return;
            }
            if (!this.allVideos[this.swiper.activeIndex - 1]) {
                this.onSliderEnd()
                return
            }
            this.allVideos.forEach(elem => {
                elem.setPlay(false)
            })
            this.allVideos[this.swiper.activeIndex - 1].setPlay(true)
            this.swiper.slidePrev()
            this.allVideos.forEach(elem => {
                elem.updateStyle()
            })
        }

        updateStyle() {

            let activeIndex = this.swiper.activeIndex

            this.slideElement.classList.remove("swiper-slide_left-step-1")
            this.slideElement.classList.remove("swiper-slide_left-step-2")
            this.slideElement.classList.remove("swiper-slide_right-step-1")
            this.slideElement.classList.remove("swiper-slide_right-step-2")
            this.slideElement.classList.remove("swiper-slide_not-visible")

            if (activeIndex === this.index) {

            } else if (activeIndex === this.index - 1) {
                this.slideElement.classList.add("swiper-slide_left-step-1")
            } else if (activeIndex === this.index + 1) {
                this.slideElement.classList.add("swiper-slide_right-step-1")
            } else if (activeIndex === this.index - 2) {
                this.slideElement.classList.add("swiper-slide_left-step-2")
            } else if (activeIndex === this.index + 2) {
                this.slideElement.classList.add("swiper-slide_right-step-2")
            } else {
                this.slideElement.classList.add("swiper-slide_not-visible")
            }

        }

        viewError = false
        viewLoading = false

        constructor(instaVideo, index, slideElement, fullGallery) {
            this.instaVideo = instaVideo
            this.player = instaVideo.querySelector(".insta-video__player")
            this.preloader = instaVideo.querySelector(".insta-video__preloader")
            this.error = instaVideo.querySelector(".insta-video__error")
            this.button = instaVideo.querySelector(".insta-video__button")
            this.index = index
            this.slideElement = slideElement
            this.fullGallery = fullGallery
            this.soundButton = instaVideo.querySelector(".insta-gallery-full__sound")

            this.error.style.display = "none"

            this.player.muted = true

            //initialize metadata
            this.player.addEventListener("loadedmetadata", () => {
                this.length = this.player.duration
            })

            this.player.addEventListener("error", event => {
                this.isErrored = true
                this.setErrorView(true)
                this.setPlay(false)
                this.onError()
            })

            this.player.addEventListener("abort", event => {
                this.isErrored = true
                this.setErrorView(true)
                this.setPlay(false)
                this.onError()
            })

            //progress event initialize
            this.player.addEventListener("playing", () => {
                this.setLoadingView(false)
            })
            this.player.addEventListener("waiting", () => {
                this.setLoadingView(true)
            })
            this.player.addEventListener("timeupdate", event => {
                this.onProgress(this.player.currentTime)
            })
            this.player.addEventListener("ended", () => {
                this.sliderNext()
            })

            //Pause action
            let isPause = false
            let pauseTimer

            this.x = 0

            let mouseDown = event => {

                if (event.which !== 1) return;

                if (!this.isPlayed) return

                this.x = event.clientX

                this.player.pause()

                clearTimeout(pauseTimer)
                pauseTimer = setTimeout(() => {
                    isPause = true
                }, 200)
            }

            let touchDown = event => {

                if (!this.isPlayed) return;

                if (event.touches.length === 0) return
                this.x = event.changedTouches[0].clientX

                this.player.pause()

                clearTimeout(pauseTimer)
                pauseTimer = setTimeout(() => {
                    isPause = true
                }, 200)
            }

            let mouseUp = event => {

                if (event.which !== 1) return;

                if (!this.isPlayed) return;

                clearTimeout(pauseTimer)
            }

            let touchUp = event => {

                if (!this.isPlayed) return;

                clearTimeout(pauseTimer)
                if (isPause) {
                    this.player.play()
                    isPause = false
                }
            }

            let click = event => {

                if (!this.isPlayed) {
                    this.fullGallery.fullGallerySlideTo(this.index)
                    return
                }

                if (isPause) {
                    this.player.play()
                    isPause = false
                    return;
                }

                if (event.clientX > innerWidth / 2) {
                    this.sliderNext(event)
                } else {
                    this.sliderBack(event)
                }
            }

            this.button.addEventListener("click", click)
            this.button.addEventListener("mousedown", mouseDown)
            this.button.addEventListener("touchstart", touchDown)
            this.button.addEventListener("mouseup", mouseUp)
            this.button.addEventListener("touchend", touchUp)
            this.button.oncontextmenu = event => {
                return false
            }

            //Volume button
            this.soundButton.addEventListener("click", () => {
                this.fullGallery.fullGallerySetVolume(!fullGallery.fullGalleryVolume)
            })
            this.updateViewSoundButton()
        }

        LoadAndPlay = () => {
            if (this.isLoading) return
            if (this.isPlayed === true) {
                this.player.play()
                if (this.isErrored) {
                    this.playError()
                    return;
                }
                this.setLoadingView(false)
            } else {
                this.player.pause()
                clearInterval(this.errorProgressInterval)
            }
        }

        setPlay(play) {
            if (play === this.isPlayed || this.isLoading) return
            if (play) {
                clearInterval(this.errorProgressInterval)
                this.isPlayed = true
                this.LoadAndPlay()
            } else {
                clearInterval(this.errorProgressInterval)
                this.player.pause()
                this.isPlayed = false

                this.updateViewSoundButton()
            }
            this.updateStyle()
        }

        setProgress(time) {
            this.player.currentTime = time
        }

        updateViewSoundButton() {
            let icons = this.soundButton.querySelectorAll("svg")

            if (!this.fullGallery.fullGalleryVolume) {
                icons[1].style.display = "none"
                icons[0].style.display = ""
            } else {
                icons[0].style.display = "none"
                icons[1].style.display = ""
            }
        }

        setLoadingView(state) {
            if (state === this.viewLoading) return
            if (state) {
                this.preloader.style.display = ""
                this.viewLoading = true
            } else {
                this.preloader.style.display = "none"
                this.viewLoading = false
            }
        }

        playError() {
            this.errorTimeEnd = 0
            this.length = 50
            this.errorProgressInterval = setInterval(() => {
                if (this.errorTimeEnd > 50) {
                    clearInterval(this.errorProgressInterval)
                    this.sliderNext()
                    return
                }

                this.errorTimeEnd += 1
                this.onProgress(this.errorTimeEnd)
            }, 20)
        }

        setErrorView(state) {
            if (state === this.viewError) return
            if (state) {
                this.error.style.display = ""
                this.viewError = true
            } else {
                this.error.style.display = "none"
                this.viewError = false
            }
        }
    }

    class InstaGallery {

        fullGalleryIsOpen = false
        fullGalleryVolume = true

        instaVideoList = new Array(0)

        static delegate() {
            let instaGalleryDOM = document.querySelectorAll(".insta-gallery")
            if (instaGalleryDOM) instaGalleryDOM.forEach(elem => new this(elem))
        }

        constructor(instaGallery) {
            this.instaGallery = instaGallery;
            this.swiperLeft = this.instaGallery.querySelector(".insta-gallery__left-arrow")
            this.swiperRight = this.instaGallery.querySelector(".insta-gallery__right-arrow")

            //sound button
            this.soundButton = this.instaGallery.querySelector(".insta-gallery-full__volume-button")
            this.soundButton.addEventListener("click", () => {
                this.fullGallerySetVolume(!this.fullGalleryVolume)
            })

            //gallery
            this.swiper = new Swiper(this.instaGallery.querySelector(".insta-gallery__swiper"), {
                spaceBetween: 8.8,
                slidesPerView: "auto",
                navigation: {
                    prevEl: this.swiperLeft,
                    nextEl: this.swiperRight,
                },
                breakpoints: {
                    1200: {
                        spaceBetween: 10
                    },
                    1023: {
                        spaceBetween: 8.8
                    },
                    512: {
                        spaceBetween: 7.46
                    }
                },
                watchSlidesProgress: true
            })

            //full gallery
            this.fullGallery = this.instaGallery.querySelector(".insta-gallery-full")
            this.fullGalleryClose = this.instaGallery.querySelector(".insta-gallery-full__close")
            this.fullGalleryWrapper = this.instaGallery.querySelector(".insta-gallery-full__swiper .swiper-wrapper")

            //navigation
            this.fullGalleryNavidation = this.instaGallery.querySelector(".insta-gallery-full__navigation")

            this.fullGalleryWrapper.innerHTML = ""
            this.fullGalleryNavidation.innerHTML = ""

            let index = 0

            this.swiper.slides.forEach((elem, index) => {
                let image = elem.querySelector(".insta-gallery__preview")
                let videoSrc = elem.getAttribute("data-video")

                //Add open video action
                image.addEventListener("click", () => {
                    this.fullSwiper.slideTo(index - 1, 0)
                    this.fullGallerySetOpen(true)
                })

                //initialize video
                let newInstaVideo = document.createElement("div")
                newInstaVideo.setAttribute("class", "insta-video")
                newInstaVideo.innerHTML = `
                    <div class="insta-video__button"></div>
                    <video class="insta-video__player" src="${videoSrc}" playsinline preload="metadata" webkit-playsinline muted></video>
                    <div class="insta-video__error" style="display: none">Ошибка<br>Не удалось загрузить ролик.</div>
                    <div class="insta-video__preloader" style="display: none"></div>
                    `

                //initialize sound button
                let soundButton = document.createElement("div")
                soundButton.classList.add("insta-gallery-full__sound")
                soundButton.innerHTML = `
                    <svg width="31" height="18" viewBox="0 0 31 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0L7 4H0V14H7L12 18V0ZM29.2929 2.29289L24.5 7.08579L19.7071 2.29289L18.2929 3.70711L23.0858 8.5L18.2929 13.2929L19.7071 14.7071L24.5 9.91421L29.2929 14.7071L30.7071 13.2929L25.9142 8.5L30.7071 3.70711L29.2929 2.29289Z" fill="white"/>
                    </svg>
                    <svg width="31" height="18" viewBox="0 0 31 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0L7 4H0V14H7L12 18V0ZM22 2C25.866 2 29 5.13401 29 9C29 12.866 25.866 16 22 16H18V18H22C26.9706 18 31 13.9706 31 9C31 4.02944 26.9706 0 22 0H18V2H22ZM25 9C25 7.34315 23.6569 6 22 6H18V4H22C24.7614 4 27 6.23858 27 9C27 11.7614 24.7614 14 22 14H18V12H22C23.6569 12 25 10.6569 25 9Z" fill="white"/>
                    </svg>
                `
                newInstaVideo.appendChild(soundButton)

                let newSlide = document.createElement("div")
                newSlide.setAttribute("class", "swiper-slide")
                newSlide.appendChild(newInstaVideo)
                this.fullGalleryWrapper.appendChild(newSlide)

                this.instaVideoList.push(new InstaVideo(newInstaVideo, index, newSlide, this))

                index++

                this.fullGalleryNavidation.innerHTML += `
                <div class="insta-gallery-full__navigation-line">
                    <div class="insta-gallery-full__navigation-line-progress" style="width: 0"></div>
                </div>
            `
            })

            //full swiper
            this.fullSwiper = new Swiper(this.instaGallery.querySelector(".insta-gallery-full__swiper"), {
                spaceBetween: 0,
                speed: 300,
                allowTouchMove: false,
                breakpoints: {
                    1200: {
                        spaceBetween: 42
                    },
                    1023: {
                        spaceBetween: 31
                    },
                    512: {
                        spaceBetween: 27
                    }
                }
            })

            this.fullGalleryClose.addEventListener("click", () => {
                this.fullGallerySetOpen(false)
            })

            //full swiper actions
            this.instaVideoList.forEach((video, index) => {
                video.swiper = this.fullSwiper
                video.allVideos = this.instaVideoList
                video.onSliderEnd = () => {
                    this.fullGallerySetOpen(false)
                }
            })

            //Navigation action
            this.fullSwiper.on("slideChange", swiper => {
                this.fullGalleryNavidation.querySelectorAll(".insta-gallery-full__navigation-line").forEach((elem, index) => {
                    elem.querySelector(".insta-gallery-full__navigation-line-progress").style.display = "none"
                    if (index < swiper.activeIndex) {
                        elem.style.backgroundColor = "#FFF"
                    } else {
                        elem.style.backgroundColor = ""
                    }

                    if (index === swiper.activeIndex) {
                        elem.querySelector(".insta-gallery-full__navigation-line-progress").style.display = ""
                    }

                    elem.querySelector(".insta-gallery-full__navigation-line-progress").style.width = "0"
                })
            })

            //Progress action
            this.instaVideoList.forEach((elem, index) => {
                elem.onProgress = (progress) => {
                    let line = this.fullGalleryNavidation.children[index].querySelector(".insta-gallery-full__navigation-line-progress")
                    line.style.width = (progress / elem.length) * 100 + "%"
                }

                elem.onEnd = () => {
                    if (this.fullSwiper.activeIndex === this.fullSwiper.slides.length - 1) this.fullGallerySetOpen(false)
                    else this.fullSwiper.slideNext()
                }
            })

            //volume button
            this.fullGallerySetVolume()

            //keyboard buttons actions
            addEventListener("keydown", event => {

                if (event.key === "Escape") {
                    this.fullGallerySetOpen(false)
                }

                if (event.key === " ") {
                    if (this.fullGalleryIsOpen)
                        this.fullGallerySetPlay(!this.isPlay)
                }

                if (event.key === "ArrowLeft") {
                    if (0 > this.fullSwiper.activeIndex - 1) {
                        this.fullGallerySetOpen(false)
                        return
                    }
                    this.fullGallerySlideTo(this.fullSwiper.activeIndex - 1)
                    this.instaVideoList.forEach(elem => elem.updateViewSoundButton())
                } else if (event.key === "ArrowRight") {
                    if (this.fullSwiper.slides.length < this.fullSwiper.activeIndex + 2) {
                        this.fullGallerySetOpen(false)
                        return
                    }
                    this.fullGallerySlideTo(this.fullSwiper.activeIndex + 1)
                    this.instaVideoList.forEach(elem => elem.updateViewSoundButton())
                }

            })

            //Click other action
            this.fullGallery.addEventListener("click", event => {
                let isTarget = event.target === this.fullGallery
                if(isTarget) this.fullGallerySetOpen(false)
            })
        }

        isPlay = false

        fullGallerySetPlay(state) {
            if (state === this.isPlay) return
            this.isPlay = !!state;
            this.updatePlay()
        }

        updatePlay() {
            if (this.fullGalleryIsOpen && this.isPlay) {
                this.instaVideoList.forEach(video => video.setPlay(false))
                this.instaVideoList[this.fullSwiper.activeIndex].setPlay(true)
            } else {
                this.instaVideoList.forEach(video => video.setPlay(false))
            }
        }

        fullGallerySlideTo(index) {
            this.fullSwiper.slideTo(index)
            this.updatePlay()
            this.instaVideoList.forEach(elem => elem.updateStyle())
            this.instaVideoList.forEach(video => video.setProgress(0))
        }

        fullGallerySetOpen(state) {
            if (this.fullGalleryIsOpen === state) return;

            if (state) {
                this.fullGallery.style.display = ""
                this.fullGalleryIsOpen = true
                this.fullGallerySetPlay(true)
                this.instaVideoList.forEach(elem => elem.updateStyle())
                this.instaVideoList.forEach(video => video.setProgress(0))
            } else {
                this.fullGallery.style.display = "none"
                this.fullGalleryIsOpen = false
                this.fullGallerySetPlay(false)
            }
        }

        fullGallerySetVolume() {
            if (this.fullGalleryVolume) {
                this.fullGallery.querySelectorAll(".insta-gallery-full__swiper .swiper-wrapper .swiper-slide").forEach((elem, index) => {
                    let video = elem.querySelector("video")
                    video.muted = true
                })
            } else {
                this.fullGallery.querySelectorAll(".insta-gallery-full__swiper .swiper-wrapper .swiper-slide").forEach((elem, index) => {
                    let video = elem.querySelector("video")
                    video.muted = false
                })
            }
            this.fullGalleryVolume = !this.fullGalleryVolume
            this.instaVideoList.forEach(elem => elem.updateViewSoundButton())

            //button icon update
            let buttonIcons = this.soundButton.querySelectorAll("svg")

            if (this.fullGalleryVolume) {
                buttonIcons[0].style.display = "none"
                buttonIcons[1].style.display = ""
            } else {
                buttonIcons[0].style.display = ""
                buttonIcons[1].style.display = "none"
            }
        }
    }

    InstaGallery.delegate()
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdG9yaWVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0Jztcclxue1xyXG5cclxuICAgIGNsYXNzIEluc3RhVmlkZW8ge1xyXG5cclxuICAgICAgICBpbmRleCA9IDBcclxuXHJcbiAgICAgICAgaXNQbGF5ZWQgPSBmYWxzZVxyXG4gICAgICAgIGlzRXJyb3JlZCA9IGZhbHNlXHJcbiAgICAgICAgaXNMb2FkaW5nID0gZmFsc2VcclxuXHJcbiAgICAgICAgc3dpcGVyXHJcbiAgICAgICAgYWxsVmlkZW9zXHJcblxyXG4gICAgICAgIGxlbmd0aCA9IDBcclxuXHJcbiAgICAgICAgb25FbmQgPSAoKSA9PiB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvbkVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Qcm9ncmVzcyA9IChwcm9ncmVzcykgPT4ge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25TbGlkZXJFbmQgPSAoKSA9PiB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzbGlkZXJOZXh0ID0gZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQudGFyZ2V0LnRhZ05hbWUgPT09IFwiQVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2xpZGVyRW5kKClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuYWxsVmlkZW9zW3RoaXMuc3dpcGVyLmFjdGl2ZUluZGV4ICsgMV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25TbGlkZXJFbmQoKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5hbGxWaWRlb3MuZm9yRWFjaChlbGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZW0uc2V0UGxheShmYWxzZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5hbGxWaWRlb3NbdGhpcy5zd2lwZXIuYWN0aXZlSW5kZXggKyAxXS5zZXRQbGF5KHRydWUpXHJcbiAgICAgICAgICAgIHRoaXMuc3dpcGVyLnNsaWRlTmV4dCgpXHJcbiAgICAgICAgICAgIHRoaXMuYWxsVmlkZW9zLmZvckVhY2goZWxlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtLnVwZGF0ZVN0eWxlKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNsaWRlckJhY2sgPSBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudCAmJiBldmVudC50YXJnZXQudGFnTmFtZSA9PT0gXCJBXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25TbGlkZXJFbmQoKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hbGxWaWRlb3NbdGhpcy5zd2lwZXIuYWN0aXZlSW5kZXggLSAxXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblNsaWRlckVuZCgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmFsbFZpZGVvcy5mb3JFYWNoKGVsZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgZWxlbS5zZXRQbGF5KGZhbHNlKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLmFsbFZpZGVvc1t0aGlzLnN3aXBlci5hY3RpdmVJbmRleCAtIDFdLnNldFBsYXkodHJ1ZSlcclxuICAgICAgICAgICAgdGhpcy5zd2lwZXIuc2xpZGVQcmV2KClcclxuICAgICAgICAgICAgdGhpcy5hbGxWaWRlb3MuZm9yRWFjaChlbGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZW0udXBkYXRlU3R5bGUoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXBkYXRlU3R5bGUoKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSB0aGlzLnN3aXBlci5hY3RpdmVJbmRleFxyXG5cclxuICAgICAgICAgICAgdGhpcy5zbGlkZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInN3aXBlci1zbGlkZV9sZWZ0LXN0ZXAtMVwiKVxyXG4gICAgICAgICAgICB0aGlzLnNsaWRlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic3dpcGVyLXNsaWRlX2xlZnQtc3RlcC0yXCIpXHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzd2lwZXItc2xpZGVfcmlnaHQtc3RlcC0xXCIpXHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzd2lwZXItc2xpZGVfcmlnaHQtc3RlcC0yXCIpXHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzd2lwZXItc2xpZGVfbm90LXZpc2libGVcIilcclxuXHJcbiAgICAgICAgICAgIGlmIChhY3RpdmVJbmRleCA9PT0gdGhpcy5pbmRleCkge1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhY3RpdmVJbmRleCA9PT0gdGhpcy5pbmRleCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzd2lwZXItc2xpZGVfbGVmdC1zdGVwLTFcIilcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhY3RpdmVJbmRleCA9PT0gdGhpcy5pbmRleCArIDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzd2lwZXItc2xpZGVfcmlnaHQtc3RlcC0xXCIpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aXZlSW5kZXggPT09IHRoaXMuaW5kZXggLSAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic3dpcGVyLXNsaWRlX2xlZnQtc3RlcC0yXCIpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aXZlSW5kZXggPT09IHRoaXMuaW5kZXggKyAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic3dpcGVyLXNsaWRlX3JpZ2h0LXN0ZXAtMlwiKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInN3aXBlci1zbGlkZV9ub3QtdmlzaWJsZVwiKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmlld0Vycm9yID0gZmFsc2VcclxuICAgICAgICB2aWV3TG9hZGluZyA9IGZhbHNlXHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGluc3RhVmlkZW8sIGluZGV4LCBzbGlkZUVsZW1lbnQsIGZ1bGxHYWxsZXJ5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFWaWRlbyA9IGluc3RhVmlkZW9cclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBpbnN0YVZpZGVvLnF1ZXJ5U2VsZWN0b3IoXCIuaW5zdGEtdmlkZW9fX3BsYXllclwiKVxyXG4gICAgICAgICAgICB0aGlzLnByZWxvYWRlciA9IGluc3RhVmlkZW8ucXVlcnlTZWxlY3RvcihcIi5pbnN0YS12aWRlb19fcHJlbG9hZGVyXCIpXHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3IgPSBpbnN0YVZpZGVvLnF1ZXJ5U2VsZWN0b3IoXCIuaW5zdGEtdmlkZW9fX2Vycm9yXCIpXHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uID0gaW5zdGFWaWRlby5xdWVyeVNlbGVjdG9yKFwiLmluc3RhLXZpZGVvX19idXR0b25cIilcclxuICAgICAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVFbGVtZW50ID0gc2xpZGVFbGVtZW50XHJcbiAgICAgICAgICAgIHRoaXMuZnVsbEdhbGxlcnkgPSBmdWxsR2FsbGVyeVxyXG4gICAgICAgICAgICB0aGlzLnNvdW5kQnV0dG9uID0gaW5zdGFWaWRlby5xdWVyeVNlbGVjdG9yKFwiLmluc3RhLWdhbGxlcnktZnVsbF9fc291bmRcIilcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3Iuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXHJcblxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5tdXRlZCA9IHRydWVcclxuXHJcbiAgICAgICAgICAgIC8vaW5pdGlhbGl6ZSBtZXRhZGF0YVxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVkbWV0YWRhdGFcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLnBsYXllci5kdXJhdGlvblxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNFcnJvcmVkID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRFcnJvclZpZXcodHJ1ZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UGxheShmYWxzZSlcclxuICAgICAgICAgICAgICAgIHRoaXMub25FcnJvcigpXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0Vycm9yZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVycm9yVmlldyh0cnVlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQbGF5KGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yKClcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vcHJvZ3Jlc3MgZXZlbnQgaW5pdGlhbGl6ZVxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hZGRFdmVudExpc3RlbmVyKFwicGxheWluZ1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldExvYWRpbmdWaWV3KGZhbHNlKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hZGRFdmVudExpc3RlbmVyKFwid2FpdGluZ1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldExvYWRpbmdWaWV3KHRydWUpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aW1ldXBkYXRlXCIsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Qcm9ncmVzcyh0aGlzLnBsYXllci5jdXJyZW50VGltZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImVuZGVkXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVyTmV4dCgpXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvL1BhdXNlIGFjdGlvblxyXG4gICAgICAgICAgICBsZXQgaXNQYXVzZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIGxldCBwYXVzZVRpbWVyXHJcblxyXG4gICAgICAgICAgICB0aGlzLnggPSAwXHJcblxyXG4gICAgICAgICAgICBsZXQgbW91c2VEb3duID0gZXZlbnQgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChldmVudC53aGljaCAhPT0gMSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1BsYXllZCkgcmV0dXJuXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy54ID0gZXZlbnQuY2xpZW50WFxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBhdXNlKClcclxuXHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocGF1c2VUaW1lcilcclxuICAgICAgICAgICAgICAgIHBhdXNlVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpc1BhdXNlID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSwgMjAwKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgdG91Y2hEb3duID0gZXZlbnQgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1BsYXllZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucGF1c2UoKVxyXG5cclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChwYXVzZVRpbWVyKVxyXG4gICAgICAgICAgICAgICAgcGF1c2VUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzUGF1c2UgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LCAyMDApXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBtb3VzZVVwID0gZXZlbnQgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChldmVudC53aGljaCAhPT0gMSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1BsYXllZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChwYXVzZVRpbWVyKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgdG91Y2hVcCA9IGV2ZW50ID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNQbGF5ZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocGF1c2VUaW1lcilcclxuICAgICAgICAgICAgICAgIGlmIChpc1BhdXNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucGxheSgpXHJcbiAgICAgICAgICAgICAgICAgICAgaXNQYXVzZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBjbGljayA9IGV2ZW50ID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNQbGF5ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZ1bGxHYWxsZXJ5LmZ1bGxHYWxsZXJ5U2xpZGVUbyh0aGlzLmluZGV4KVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc1BhdXNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucGxheSgpXHJcbiAgICAgICAgICAgICAgICAgICAgaXNQYXVzZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5jbGllbnRYID4gaW5uZXJXaWR0aCAvIDIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNsaWRlck5leHQoZXZlbnQpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVyQmFjayhldmVudClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrKVxyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIG1vdXNlRG93bilcclxuICAgICAgICAgICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdG91Y2hEb3duKVxyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBtb3VzZVVwKVxyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdG91Y2hVcClcclxuICAgICAgICAgICAgdGhpcy5idXR0b24ub25jb250ZXh0bWVudSA9IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1ZvbHVtZSBidXR0b25cclxuICAgICAgICAgICAgdGhpcy5zb3VuZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeS5mdWxsR2FsbGVyeVNldFZvbHVtZSghZnVsbEdhbGxlcnkuZnVsbEdhbGxlcnlWb2x1bWUpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlld1NvdW5kQnV0dG9uKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIExvYWRBbmRQbGF5ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0xvYWRpbmcpIHJldHVyblxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1BsYXllZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucGxheSgpXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0Vycm9yZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlFcnJvcigpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMb2FkaW5nVmlldyhmYWxzZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBhdXNlKClcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5lcnJvclByb2dyZXNzSW50ZXJ2YWwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFBsYXkocGxheSkge1xyXG4gICAgICAgICAgICBpZiAocGxheSA9PT0gdGhpcy5pc1BsYXllZCB8fCB0aGlzLmlzTG9hZGluZykgcmV0dXJuXHJcbiAgICAgICAgICAgIGlmIChwbGF5KSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuZXJyb3JQcm9ncmVzc0ludGVydmFsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1BsYXllZCA9IHRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMuTG9hZEFuZFBsYXkoKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmVycm9yUHJvZ3Jlc3NJbnRlcnZhbClcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBhdXNlKClcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNQbGF5ZWQgPSBmYWxzZVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmlld1NvdW5kQnV0dG9uKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN0eWxlKClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFByb2dyZXNzKHRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuY3VycmVudFRpbWUgPSB0aW1lXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cGRhdGVWaWV3U291bmRCdXR0b24oKSB7XHJcbiAgICAgICAgICAgIGxldCBpY29ucyA9IHRoaXMuc291bmRCdXR0b24ucXVlcnlTZWxlY3RvckFsbChcInN2Z1wiKVxyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmZ1bGxHYWxsZXJ5LmZ1bGxHYWxsZXJ5Vm9sdW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpY29uc1sxXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAgICAgICAgIGljb25zWzBdLnN0eWxlLmRpc3BsYXkgPSBcIlwiXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpY29uc1swXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAgICAgICAgIGljb25zWzFdLnN0eWxlLmRpc3BsYXkgPSBcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldExvYWRpbmdWaWV3KHN0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gdGhpcy52aWV3TG9hZGluZykgcmV0dXJuXHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVsb2FkZXIuc3R5bGUuZGlzcGxheSA9IFwiXCJcclxuICAgICAgICAgICAgICAgIHRoaXMudmlld0xvYWRpbmcgPSB0cnVlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByZWxvYWRlci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAgICAgICAgIHRoaXMudmlld0xvYWRpbmcgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwbGF5RXJyb3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JUaW1lRW5kID0gMFxyXG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IDUwXHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JQcm9ncmVzc0ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXJyb3JUaW1lRW5kID4gNTApIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuZXJyb3JQcm9ncmVzc0ludGVydmFsKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVyTmV4dCgpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvclRpbWVFbmQgKz0gMVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vblByb2dyZXNzKHRoaXMuZXJyb3JUaW1lRW5kKVxyXG4gICAgICAgICAgICB9LCAyMClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEVycm9yVmlldyhzdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IHRoaXMudmlld0Vycm9yKSByZXR1cm5cclxuICAgICAgICAgICAgaWYgKHN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yLnN0eWxlLmRpc3BsYXkgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdFcnJvciA9IHRydWVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3Iuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdFcnJvciA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgSW5zdGFHYWxsZXJ5IHtcclxuXHJcbiAgICAgICAgZnVsbEdhbGxlcnlJc09wZW4gPSBmYWxzZVxyXG4gICAgICAgIGZ1bGxHYWxsZXJ5Vm9sdW1lID0gdHJ1ZVxyXG5cclxuICAgICAgICBpbnN0YVZpZGVvTGlzdCA9IG5ldyBBcnJheSgwKVxyXG5cclxuICAgICAgICBzdGF0aWMgZGVsZWdhdGUoKSB7XHJcbiAgICAgICAgICAgIGxldCBpbnN0YUdhbGxlcnlET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmluc3RhLWdhbGxlcnlcIilcclxuICAgICAgICAgICAgaWYgKGluc3RhR2FsbGVyeURPTSkgaW5zdGFHYWxsZXJ5RE9NLmZvckVhY2goZWxlbSA9PiBuZXcgdGhpcyhlbGVtKSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGluc3RhR2FsbGVyeSkge1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhR2FsbGVyeSA9IGluc3RhR2FsbGVyeTtcclxuICAgICAgICAgICAgdGhpcy5zd2lwZXJMZWZ0ID0gdGhpcy5pbnN0YUdhbGxlcnkucXVlcnlTZWxlY3RvcihcIi5pbnN0YS1nYWxsZXJ5X19sZWZ0LWFycm93XCIpXHJcbiAgICAgICAgICAgIHRoaXMuc3dpcGVyUmlnaHQgPSB0aGlzLmluc3RhR2FsbGVyeS5xdWVyeVNlbGVjdG9yKFwiLmluc3RhLWdhbGxlcnlfX3JpZ2h0LWFycm93XCIpXHJcblxyXG4gICAgICAgICAgICAvL3NvdW5kIGJ1dHRvblxyXG4gICAgICAgICAgICB0aGlzLnNvdW5kQnV0dG9uID0gdGhpcy5pbnN0YUdhbGxlcnkucXVlcnlTZWxlY3RvcihcIi5pbnN0YS1nYWxsZXJ5LWZ1bGxfX3ZvbHVtZS1idXR0b25cIilcclxuICAgICAgICAgICAgdGhpcy5zb3VuZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeVNldFZvbHVtZSghdGhpcy5mdWxsR2FsbGVyeVZvbHVtZSlcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vZ2FsbGVyeVxyXG4gICAgICAgICAgICB0aGlzLnN3aXBlciA9IG5ldyBTd2lwZXIodGhpcy5pbnN0YUdhbGxlcnkucXVlcnlTZWxlY3RvcihcIi5pbnN0YS1nYWxsZXJ5X19zd2lwZXJcIiksIHtcclxuICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogOC44LFxyXG4gICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogXCJhdXRvXCIsXHJcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldkVsOiB0aGlzLnN3aXBlckxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEVsOiB0aGlzLnN3aXBlclJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgMTIwMDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDEwXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAxMDIzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogOC44XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICA1MTI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA3LjQ2XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWVcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vZnVsbCBnYWxsZXJ5XHJcbiAgICAgICAgICAgIHRoaXMuZnVsbEdhbGxlcnkgPSB0aGlzLmluc3RhR2FsbGVyeS5xdWVyeVNlbGVjdG9yKFwiLmluc3RhLWdhbGxlcnktZnVsbFwiKVxyXG4gICAgICAgICAgICB0aGlzLmZ1bGxHYWxsZXJ5Q2xvc2UgPSB0aGlzLmluc3RhR2FsbGVyeS5xdWVyeVNlbGVjdG9yKFwiLmluc3RhLWdhbGxlcnktZnVsbF9fY2xvc2VcIilcclxuICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeVdyYXBwZXIgPSB0aGlzLmluc3RhR2FsbGVyeS5xdWVyeVNlbGVjdG9yKFwiLmluc3RhLWdhbGxlcnktZnVsbF9fc3dpcGVyIC5zd2lwZXItd3JhcHBlclwiKVxyXG5cclxuICAgICAgICAgICAgLy9uYXZpZ2F0aW9uXHJcbiAgICAgICAgICAgIHRoaXMuZnVsbEdhbGxlcnlOYXZpZGF0aW9uID0gdGhpcy5pbnN0YUdhbGxlcnkucXVlcnlTZWxlY3RvcihcIi5pbnN0YS1nYWxsZXJ5LWZ1bGxfX25hdmlnYXRpb25cIilcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZnVsbEdhbGxlcnlXcmFwcGVyLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeU5hdmlkYXRpb24uaW5uZXJIVE1MID0gXCJcIlxyXG5cclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMFxyXG5cclxuICAgICAgICAgICAgdGhpcy5zd2lwZXIuc2xpZGVzLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW1hZ2UgPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoXCIuaW5zdGEtZ2FsbGVyeV9fcHJldmlld1wiKVxyXG4gICAgICAgICAgICAgICAgbGV0IHZpZGVvU3JjID0gZWxlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZpZGVvXCIpXHJcblxyXG4gICAgICAgICAgICAgICAgLy9BZGQgb3BlbiB2aWRlbyBhY3Rpb25cclxuICAgICAgICAgICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mdWxsU3dpcGVyLnNsaWRlVG8oaW5kZXggLSAxLCAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnVsbEdhbGxlcnlTZXRPcGVuKHRydWUpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC8vaW5pdGlhbGl6ZSB2aWRlb1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0luc3RhVmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICAgICAgICAgICAgICBuZXdJbnN0YVZpZGVvLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaW5zdGEtdmlkZW9cIilcclxuICAgICAgICAgICAgICAgIG5ld0luc3RhVmlkZW8uaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnN0YS12aWRlb19fYnV0dG9uXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPHZpZGVvIGNsYXNzPVwiaW5zdGEtdmlkZW9fX3BsYXllclwiIHNyYz1cIiR7dmlkZW9TcmN9XCIgcGxheXNpbmxpbmUgcHJlbG9hZD1cIm1ldGFkYXRhXCIgd2Via2l0LXBsYXlzaW5saW5lIG11dGVkPjwvdmlkZW8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluc3RhLXZpZGVvX19lcnJvclwiIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiPtCe0YjQuNCx0LrQsDxicj7QndC1INGD0LTQsNC70L7RgdGMINC30LDQs9GA0YPQt9C40YLRjCDRgNC+0LvQuNC6LjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnN0YS12aWRlb19fcHJlbG9hZGVyXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgYFxyXG5cclxuICAgICAgICAgICAgICAgIC8vaW5pdGlhbGl6ZSBzb3VuZCBidXR0b25cclxuICAgICAgICAgICAgICAgIGxldCBzb3VuZEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgICAgICAgICAgICAgIHNvdW5kQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJpbnN0YS1nYWxsZXJ5LWZ1bGxfX3NvdW5kXCIpXHJcbiAgICAgICAgICAgICAgICBzb3VuZEJ1dHRvbi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjMxXCIgaGVpZ2h0PVwiMThcIiB2aWV3Qm94PVwiMCAwIDMxIDE4XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0xMiAwTDcgNEgwVjE0SDdMMTIgMThWMFpNMjkuMjkyOSAyLjI5Mjg5TDI0LjUgNy4wODU3OUwxOS43MDcxIDIuMjkyODlMMTguMjkyOSAzLjcwNzExTDIzLjA4NTggOC41TDE4LjI5MjkgMTMuMjkyOUwxOS43MDcxIDE0LjcwNzFMMjQuNSA5LjkxNDIxTDI5LjI5MjkgMTQuNzA3MUwzMC43MDcxIDEzLjI5MjlMMjUuOTE0MiA4LjVMMzAuNzA3MSAzLjcwNzExTDI5LjI5MjkgMi4yOTI4OVpcIiBmaWxsPVwid2hpdGVcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjMxXCIgaGVpZ2h0PVwiMThcIiB2aWV3Qm94PVwiMCAwIDMxIDE4XCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBjbGlwLXJ1bGU9XCJldmVub2RkXCIgZD1cIk0xMiAwTDcgNEgwVjE0SDdMMTIgMThWMFpNMjIgMkMyNS44NjYgMiAyOSA1LjEzNDAxIDI5IDlDMjkgMTIuODY2IDI1Ljg2NiAxNiAyMiAxNkgxOFYxOEgyMkMyNi45NzA2IDE4IDMxIDEzLjk3MDYgMzEgOUMzMSA0LjAyOTQ0IDI2Ljk3MDYgMCAyMiAwSDE4VjJIMjJaTTI1IDlDMjUgNy4zNDMxNSAyMy42NTY5IDYgMjIgNkgxOFY0SDIyQzI0Ljc2MTQgNCAyNyA2LjIzODU4IDI3IDlDMjcgMTEuNzYxNCAyNC43NjE0IDE0IDIyIDE0SDE4VjEySDIyQzIzLjY1NjkgMTIgMjUgMTAuNjU2OSAyNSA5WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cclxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgIG5ld0luc3RhVmlkZW8uYXBwZW5kQ2hpbGQoc291bmRCdXR0b24pXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1NsaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgICAgICAgICAgICAgbmV3U2xpZGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzd2lwZXItc2xpZGVcIilcclxuICAgICAgICAgICAgICAgIG5ld1NsaWRlLmFwcGVuZENoaWxkKG5ld0luc3RhVmlkZW8pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bGxHYWxsZXJ5V3JhcHBlci5hcHBlbmRDaGlsZChuZXdTbGlkZSlcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhVmlkZW9MaXN0LnB1c2gobmV3IEluc3RhVmlkZW8obmV3SW5zdGFWaWRlbywgaW5kZXgsIG5ld1NsaWRlLCB0aGlzKSlcclxuXHJcbiAgICAgICAgICAgICAgICBpbmRleCsrXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeU5hdmlkYXRpb24uaW5uZXJIVE1MICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnN0YS1nYWxsZXJ5LWZ1bGxfX25hdmlnYXRpb24tbGluZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnN0YS1nYWxsZXJ5LWZ1bGxfX25hdmlnYXRpb24tbGluZS1wcm9ncmVzc1wiIHN0eWxlPVwid2lkdGg6IDBcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvL2Z1bGwgc3dpcGVyXHJcbiAgICAgICAgICAgIHRoaXMuZnVsbFN3aXBlciA9IG5ldyBTd2lwZXIodGhpcy5pbnN0YUdhbGxlcnkucXVlcnlTZWxlY3RvcihcIi5pbnN0YS1nYWxsZXJ5LWZ1bGxfX3N3aXBlclwiKSwge1xyXG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxyXG4gICAgICAgICAgICAgICAgc3BlZWQ6IDMwMCxcclxuICAgICAgICAgICAgICAgIGFsbG93VG91Y2hNb3ZlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgMTIwMDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDQyXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAxMDIzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMzFcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIDUxMjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI3XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeUNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bGxHYWxsZXJ5U2V0T3BlbihmYWxzZSlcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vZnVsbCBzd2lwZXIgYWN0aW9uc1xyXG4gICAgICAgICAgICB0aGlzLmluc3RhVmlkZW9MaXN0LmZvckVhY2goKHZpZGVvLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmlkZW8uc3dpcGVyID0gdGhpcy5mdWxsU3dpcGVyXHJcbiAgICAgICAgICAgICAgICB2aWRlby5hbGxWaWRlb3MgPSB0aGlzLmluc3RhVmlkZW9MaXN0XHJcbiAgICAgICAgICAgICAgICB2aWRlby5vblNsaWRlckVuZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZ1bGxHYWxsZXJ5U2V0T3BlbihmYWxzZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vTmF2aWdhdGlvbiBhY3Rpb25cclxuICAgICAgICAgICAgdGhpcy5mdWxsU3dpcGVyLm9uKFwic2xpZGVDaGFuZ2VcIiwgc3dpcGVyID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnVsbEdhbGxlcnlOYXZpZGF0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5zdGEtZ2FsbGVyeS1mdWxsX19uYXZpZ2F0aW9uLWxpbmVcIikuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLnF1ZXJ5U2VsZWN0b3IoXCIuaW5zdGEtZ2FsbGVyeS1mdWxsX19uYXZpZ2F0aW9uLWxpbmUtcHJvZ3Jlc3NcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgc3dpcGVyLmFjdGl2ZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjRkZGXCJcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gc3dpcGVyLmFjdGl2ZUluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0ucXVlcnlTZWxlY3RvcihcIi5pbnN0YS1nYWxsZXJ5LWZ1bGxfX25hdmlnYXRpb24tbGluZS1wcm9ncmVzc1wiKS5zdHlsZS5kaXNwbGF5ID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5xdWVyeVNlbGVjdG9yKFwiLmluc3RhLWdhbGxlcnktZnVsbF9fbmF2aWdhdGlvbi1saW5lLXByb2dyZXNzXCIpLnN0eWxlLndpZHRoID0gXCIwXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvL1Byb2dyZXNzIGFjdGlvblxyXG4gICAgICAgICAgICB0aGlzLmluc3RhVmlkZW9MaXN0LmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtLm9uUHJvZ3Jlc3MgPSAocHJvZ3Jlc3MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGluZSA9IHRoaXMuZnVsbEdhbGxlcnlOYXZpZGF0aW9uLmNoaWxkcmVuW2luZGV4XS5xdWVyeVNlbGVjdG9yKFwiLmluc3RhLWdhbGxlcnktZnVsbF9fbmF2aWdhdGlvbi1saW5lLXByb2dyZXNzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgbGluZS5zdHlsZS53aWR0aCA9IChwcm9ncmVzcyAvIGVsZW0ubGVuZ3RoKSAqIDEwMCArIFwiJVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZWxlbS5vbkVuZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mdWxsU3dpcGVyLmFjdGl2ZUluZGV4ID09PSB0aGlzLmZ1bGxTd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDEpIHRoaXMuZnVsbEdhbGxlcnlTZXRPcGVuKGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgdGhpcy5mdWxsU3dpcGVyLnNsaWRlTmV4dCgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvL3ZvbHVtZSBidXR0b25cclxuICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeVNldFZvbHVtZSgpXHJcblxyXG4gICAgICAgICAgICAvL2tleWJvYXJkIGJ1dHRvbnMgYWN0aW9uc1xyXG4gICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBldmVudCA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnVsbEdhbGxlcnlTZXRPcGVuKGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiIFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZnVsbEdhbGxlcnlJc09wZW4pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnVsbEdhbGxlcnlTZXRQbGF5KCF0aGlzLmlzUGxheSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkFycm93TGVmdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPiB0aGlzLmZ1bGxTd2lwZXIuYWN0aXZlSW5kZXggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnVsbEdhbGxlcnlTZXRPcGVuKGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeVNsaWRlVG8odGhpcy5mdWxsU3dpcGVyLmFjdGl2ZUluZGV4IC0gMSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluc3RhVmlkZW9MaXN0LmZvckVhY2goZWxlbSA9PiBlbGVtLnVwZGF0ZVZpZXdTb3VuZEJ1dHRvbigpKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT09IFwiQXJyb3dSaWdodFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZnVsbFN3aXBlci5zbGlkZXMubGVuZ3RoIDwgdGhpcy5mdWxsU3dpcGVyLmFjdGl2ZUluZGV4ICsgMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZ1bGxHYWxsZXJ5U2V0T3BlbihmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnVsbEdhbGxlcnlTbGlkZVRvKHRoaXMuZnVsbFN3aXBlci5hY3RpdmVJbmRleCArIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnN0YVZpZGVvTGlzdC5mb3JFYWNoKGVsZW0gPT4gZWxlbS51cGRhdGVWaWV3U291bmRCdXR0b24oKSlcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvL0NsaWNrIG90aGVyIGFjdGlvblxyXG4gICAgICAgICAgICB0aGlzLmZ1bGxHYWxsZXJ5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXNUYXJnZXQgPSBldmVudC50YXJnZXQgPT09IHRoaXMuZnVsbEdhbGxlcnlcclxuICAgICAgICAgICAgICAgIGlmKGlzVGFyZ2V0KSB0aGlzLmZ1bGxHYWxsZXJ5U2V0T3BlbihmYWxzZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzUGxheSA9IGZhbHNlXHJcblxyXG4gICAgICAgIGZ1bGxHYWxsZXJ5U2V0UGxheShzdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IHRoaXMuaXNQbGF5KSByZXR1cm5cclxuICAgICAgICAgICAgdGhpcy5pc1BsYXkgPSAhIXN0YXRlO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYXkoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXBkYXRlUGxheSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnVsbEdhbGxlcnlJc09wZW4gJiYgdGhpcy5pc1BsYXkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFWaWRlb0xpc3QuZm9yRWFjaCh2aWRlbyA9PiB2aWRlby5zZXRQbGF5KGZhbHNlKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFWaWRlb0xpc3RbdGhpcy5mdWxsU3dpcGVyLmFjdGl2ZUluZGV4XS5zZXRQbGF5KHRydWUpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhVmlkZW9MaXN0LmZvckVhY2godmlkZW8gPT4gdmlkZW8uc2V0UGxheShmYWxzZSkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bGxHYWxsZXJ5U2xpZGVUbyhpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmZ1bGxTd2lwZXIuc2xpZGVUbyhpbmRleClcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQbGF5KClcclxuICAgICAgICAgICAgdGhpcy5pbnN0YVZpZGVvTGlzdC5mb3JFYWNoKGVsZW0gPT4gZWxlbS51cGRhdGVTdHlsZSgpKVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhVmlkZW9MaXN0LmZvckVhY2godmlkZW8gPT4gdmlkZW8uc2V0UHJvZ3Jlc3MoMCkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdWxsR2FsbGVyeVNldE9wZW4oc3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZnVsbEdhbGxlcnlJc09wZW4gPT09IHN0YXRlKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnVsbEdhbGxlcnkuc3R5bGUuZGlzcGxheSA9IFwiXCJcclxuICAgICAgICAgICAgICAgIHRoaXMuZnVsbEdhbGxlcnlJc09wZW4gPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bGxHYWxsZXJ5U2V0UGxheSh0cnVlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YVZpZGVvTGlzdC5mb3JFYWNoKGVsZW0gPT4gZWxlbS51cGRhdGVTdHlsZSgpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YVZpZGVvTGlzdC5mb3JFYWNoKHZpZGVvID0+IHZpZGVvLnNldFByb2dyZXNzKDApKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAgICAgICAgIHRoaXMuZnVsbEdhbGxlcnlJc09wZW4gPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeVNldFBsYXkoZmFsc2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bGxHYWxsZXJ5U2V0Vm9sdW1lKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mdWxsR2FsbGVyeVZvbHVtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeS5xdWVyeVNlbGVjdG9yQWxsKFwiLmluc3RhLWdhbGxlcnktZnVsbF9fc3dpcGVyIC5zd2lwZXItd3JhcHBlciAuc3dpcGVyLXNsaWRlXCIpLmZvckVhY2goKGVsZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZpZGVvID0gZWxlbS5xdWVyeVNlbGVjdG9yKFwidmlkZW9cIilcclxuICAgICAgICAgICAgICAgICAgICB2aWRlby5tdXRlZCA9IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bGxHYWxsZXJ5LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5zdGEtZ2FsbGVyeS1mdWxsX19zd2lwZXIgLnN3aXBlci13cmFwcGVyIC5zd2lwZXItc2xpZGVcIikuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmlkZW8gPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZpZGVvLm11dGVkID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeVZvbHVtZSA9ICF0aGlzLmZ1bGxHYWxsZXJ5Vm9sdW1lXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFWaWRlb0xpc3QuZm9yRWFjaChlbGVtID0+IGVsZW0udXBkYXRlVmlld1NvdW5kQnV0dG9uKCkpXHJcblxyXG4gICAgICAgICAgICAvL2J1dHRvbiBpY29uIHVwZGF0ZVxyXG4gICAgICAgICAgICBsZXQgYnV0dG9uSWNvbnMgPSB0aGlzLnNvdW5kQnV0dG9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCJzdmdcIilcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZ1bGxHYWxsZXJ5Vm9sdW1lKSB7XHJcbiAgICAgICAgICAgICAgICBidXR0b25JY29uc1swXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAgICAgICAgIGJ1dHRvbkljb25zWzFdLnN0eWxlLmRpc3BsYXkgPSBcIlwiXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidXR0b25JY29uc1swXS5zdHlsZS5kaXNwbGF5ID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgYnV0dG9uSWNvbnNbMV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgSW5zdGFHYWxsZXJ5LmRlbGVnYXRlKClcclxufSJdLCJmaWxlIjoic3Rvcmllcy5qcyJ9