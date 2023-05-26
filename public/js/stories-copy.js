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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdG9yaWVzLWNvcHkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG57XHJcblxyXG4gICAgY2xhc3MgSW5zdGFWaWRlbyB7XHJcblxyXG4gICAgICAgIGluZGV4ID0gMFxyXG5cclxuICAgICAgICBpc1BsYXllZCA9IGZhbHNlXHJcbiAgICAgICAgaXNFcnJvcmVkID0gZmFsc2VcclxuICAgICAgICBpc0xvYWRpbmcgPSBmYWxzZVxyXG5cclxuICAgICAgICBzd2lwZXJcclxuICAgICAgICBhbGxWaWRlb3NcclxuXHJcbiAgICAgICAgbGVuZ3RoID0gMFxyXG5cclxuICAgICAgICBvbkVuZCA9ICgpID0+IHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uRXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvblByb2dyZXNzID0gKHByb2dyZXNzKSA9PiB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvblNsaWRlckVuZCA9ICgpID0+IHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNsaWRlck5leHQgPSBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudCAmJiBldmVudC50YXJnZXQudGFnTmFtZSA9PT0gXCJBXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25TbGlkZXJFbmQoKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5hbGxWaWRlb3NbdGhpcy5zd2lwZXIuYWN0aXZlSW5kZXggKyAxXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblNsaWRlckVuZCgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmFsbFZpZGVvcy5mb3JFYWNoKGVsZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgZWxlbS5zZXRQbGF5KGZhbHNlKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLmFsbFZpZGVvc1t0aGlzLnN3aXBlci5hY3RpdmVJbmRleCArIDFdLnNldFBsYXkodHJ1ZSlcclxuICAgICAgICAgICAgdGhpcy5zd2lwZXIuc2xpZGVOZXh0KClcclxuICAgICAgICAgICAgdGhpcy5hbGxWaWRlb3MuZm9yRWFjaChlbGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZW0udXBkYXRlU3R5bGUoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2xpZGVyQmFjayA9IGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnRhcmdldC50YWdOYW1lID09PSBcIkFcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblNsaWRlckVuZCgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmFsbFZpZGVvc1t0aGlzLnN3aXBlci5hY3RpdmVJbmRleCAtIDFdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2xpZGVyRW5kKClcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYWxsVmlkZW9zLmZvckVhY2goZWxlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtLnNldFBsYXkoZmFsc2UpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuYWxsVmlkZW9zW3RoaXMuc3dpcGVyLmFjdGl2ZUluZGV4IC0gMV0uc2V0UGxheSh0cnVlKVxyXG4gICAgICAgICAgICB0aGlzLnN3aXBlci5zbGlkZVByZXYoKVxyXG4gICAgICAgICAgICB0aGlzLmFsbFZpZGVvcy5mb3JFYWNoKGVsZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgZWxlbS51cGRhdGVTdHlsZSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cGRhdGVTdHlsZSgpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBhY3RpdmVJbmRleCA9IHRoaXMuc3dpcGVyLmFjdGl2ZUluZGV4XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNsaWRlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwic3dpcGVyLXNsaWRlX2xlZnQtc3RlcC0xXCIpXHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzd2lwZXItc2xpZGVfbGVmdC1zdGVwLTJcIilcclxuICAgICAgICAgICAgdGhpcy5zbGlkZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInN3aXBlci1zbGlkZV9yaWdodC1zdGVwLTFcIilcclxuICAgICAgICAgICAgdGhpcy5zbGlkZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInN3aXBlci1zbGlkZV9yaWdodC1zdGVwLTJcIilcclxuICAgICAgICAgICAgdGhpcy5zbGlkZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInN3aXBlci1zbGlkZV9ub3QtdmlzaWJsZVwiKVxyXG5cclxuICAgICAgICAgICAgaWYgKGFjdGl2ZUluZGV4ID09PSB0aGlzLmluZGV4KSB7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGl2ZUluZGV4ID09PSB0aGlzLmluZGV4IC0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInN3aXBlci1zbGlkZV9sZWZ0LXN0ZXAtMVwiKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGl2ZUluZGV4ID09PSB0aGlzLmluZGV4ICsgMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInN3aXBlci1zbGlkZV9yaWdodC1zdGVwLTFcIilcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhY3RpdmVJbmRleCA9PT0gdGhpcy5pbmRleCAtIDIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzd2lwZXItc2xpZGVfbGVmdC1zdGVwLTJcIilcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhY3RpdmVJbmRleCA9PT0gdGhpcy5pbmRleCArIDIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzd2lwZXItc2xpZGVfcmlnaHQtc3RlcC0yXCIpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic3dpcGVyLXNsaWRlX25vdC12aXNpYmxlXCIpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2aWV3RXJyb3IgPSBmYWxzZVxyXG4gICAgICAgIHZpZXdMb2FkaW5nID0gZmFsc2VcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoaW5zdGFWaWRlbywgaW5kZXgsIHNsaWRlRWxlbWVudCwgZnVsbEdhbGxlcnkpIHtcclxuICAgICAgICAgICAgdGhpcy5pbnN0YVZpZGVvID0gaW5zdGFWaWRlb1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllciA9IGluc3RhVmlkZW8ucXVlcnlTZWxlY3RvcihcIi5pbnN0YS12aWRlb19fcGxheWVyXCIpXHJcbiAgICAgICAgICAgIHRoaXMucHJlbG9hZGVyID0gaW5zdGFWaWRlby5xdWVyeVNlbGVjdG9yKFwiLmluc3RhLXZpZGVvX19wcmVsb2FkZXJcIilcclxuICAgICAgICAgICAgdGhpcy5lcnJvciA9IGluc3RhVmlkZW8ucXVlcnlTZWxlY3RvcihcIi5pbnN0YS12aWRlb19fZXJyb3JcIilcclxuICAgICAgICAgICAgdGhpcy5idXR0b24gPSBpbnN0YVZpZGVvLnF1ZXJ5U2VsZWN0b3IoXCIuaW5zdGEtdmlkZW9fX2J1dHRvblwiKVxyXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXhcclxuICAgICAgICAgICAgdGhpcy5zbGlkZUVsZW1lbnQgPSBzbGlkZUVsZW1lbnRcclxuICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeSA9IGZ1bGxHYWxsZXJ5XHJcbiAgICAgICAgICAgIHRoaXMuc291bmRCdXR0b24gPSBpbnN0YVZpZGVvLnF1ZXJ5U2VsZWN0b3IoXCIuaW5zdGEtZ2FsbGVyeS1mdWxsX19zb3VuZFwiKVxyXG5cclxuICAgICAgICAgICAgdGhpcy5lcnJvci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLm11dGVkID0gdHJ1ZVxyXG5cclxuICAgICAgICAgICAgLy9pbml0aWFsaXplIG1ldGFkYXRhXHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZWRtZXRhZGF0YVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aCA9IHRoaXMucGxheWVyLmR1cmF0aW9uXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0Vycm9yZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVycm9yVmlldyh0cnVlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRQbGF5KGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yKClcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzRXJyb3JlZCA9IHRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RXJyb3JWaWV3KHRydWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFBsYXkoZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IoKVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy9wcm9ncmVzcyBldmVudCBpbml0aWFsaXplXHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJwbGF5aW5nXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9hZGluZ1ZpZXcoZmFsc2UpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoXCJ3YWl0aW5nXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9hZGluZ1ZpZXcodHJ1ZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRpbWV1cGRhdGVcIiwgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblByb2dyZXNzKHRoaXMucGxheWVyLmN1cnJlbnRUaW1lKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hZGRFdmVudExpc3RlbmVyKFwiZW5kZWRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXJOZXh0KClcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vUGF1c2UgYWN0aW9uXHJcbiAgICAgICAgICAgIGxldCBpc1BhdXNlID0gZmFsc2VcclxuICAgICAgICAgICAgbGV0IHBhdXNlVGltZXJcclxuXHJcbiAgICAgICAgICAgIHRoaXMueCA9IDBcclxuXHJcbiAgICAgICAgICAgIGxldCBtb3VzZURvd24gPSBldmVudCA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LndoaWNoICE9PSAxKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzUGxheWVkKSByZXR1cm5cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggPSBldmVudC5jbGllbnRYXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucGF1c2UoKVxyXG5cclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChwYXVzZVRpbWVyKVxyXG4gICAgICAgICAgICAgICAgcGF1c2VUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzUGF1c2UgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9LCAyMDApXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB0b3VjaERvd24gPSBldmVudCA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzUGxheWVkKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID09PSAwKSByZXR1cm5cclxuICAgICAgICAgICAgICAgIHRoaXMueCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFhcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wYXVzZSgpXHJcblxyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHBhdXNlVGltZXIpXHJcbiAgICAgICAgICAgICAgICBwYXVzZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNQYXVzZSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH0sIDIwMClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IG1vdXNlVXAgPSBldmVudCA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LndoaWNoICE9PSAxKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzUGxheWVkKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHBhdXNlVGltZXIpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCB0b3VjaFVwID0gZXZlbnQgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1BsYXllZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChwYXVzZVRpbWVyKVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzUGF1c2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wbGF5KClcclxuICAgICAgICAgICAgICAgICAgICBpc1BhdXNlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGNsaWNrID0gZXZlbnQgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1BsYXllZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnVsbEdhbGxlcnkuZnVsbEdhbGxlcnlTbGlkZVRvKHRoaXMuaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzUGF1c2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wbGF5KClcclxuICAgICAgICAgICAgICAgICAgICBpc1BhdXNlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmNsaWVudFggPiBpbm5lcldpZHRoIC8gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVyTmV4dChldmVudClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zbGlkZXJCYWNrKGV2ZW50KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2spXHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgbW91c2VEb3duKVxyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0b3VjaERvd24pXHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNlVXApXHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0b3VjaFVwKVxyXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbi5vbmNvbnRleHRtZW51ID0gZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vVm9sdW1lIGJ1dHRvblxyXG4gICAgICAgICAgICB0aGlzLnNvdW5kQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bGxHYWxsZXJ5LmZ1bGxHYWxsZXJ5U2V0Vm9sdW1lKCFmdWxsR2FsbGVyeS5mdWxsR2FsbGVyeVZvbHVtZSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVWaWV3U291bmRCdXR0b24oKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTG9hZEFuZFBsYXkgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTG9hZGluZykgcmV0dXJuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzUGxheWVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wbGF5KClcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRXJyb3JlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUVycm9yKClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldExvYWRpbmdWaWV3KGZhbHNlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucGF1c2UoKVxyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmVycm9yUHJvZ3Jlc3NJbnRlcnZhbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0UGxheShwbGF5KSB7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ID09PSB0aGlzLmlzUGxheWVkIHx8IHRoaXMuaXNMb2FkaW5nKSByZXR1cm5cclxuICAgICAgICAgICAgaWYgKHBsYXkpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5lcnJvclByb2dyZXNzSW50ZXJ2YWwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzUGxheWVkID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb2FkQW5kUGxheSgpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuZXJyb3JQcm9ncmVzc0ludGVydmFsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucGF1c2UoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1BsYXllZCA9IGZhbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWaWV3U291bmRCdXR0b24oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3R5bGUoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0UHJvZ3Jlc3ModGltZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5jdXJyZW50VGltZSA9IHRpbWVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVwZGF0ZVZpZXdTb3VuZEJ1dHRvbigpIHtcclxuICAgICAgICAgICAgbGV0IGljb25zID0gdGhpcy5zb3VuZEJ1dHRvbi5xdWVyeVNlbGVjdG9yQWxsKFwic3ZnXCIpXHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZnVsbEdhbGxlcnkuZnVsbEdhbGxlcnlWb2x1bWUpIHtcclxuICAgICAgICAgICAgICAgIGljb25zWzFdLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxyXG4gICAgICAgICAgICAgICAgaWNvbnNbMF0uc3R5bGUuZGlzcGxheSA9IFwiXCJcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGljb25zWzBdLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxyXG4gICAgICAgICAgICAgICAgaWNvbnNbMV0uc3R5bGUuZGlzcGxheSA9IFwiXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0TG9hZGluZ1ZpZXcoc3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKHN0YXRlID09PSB0aGlzLnZpZXdMb2FkaW5nKSByZXR1cm5cclxuICAgICAgICAgICAgaWYgKHN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByZWxvYWRlci5zdHlsZS5kaXNwbGF5ID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3TG9hZGluZyA9IHRydWVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJlbG9hZGVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxyXG4gICAgICAgICAgICAgICAgdGhpcy52aWV3TG9hZGluZyA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBsYXlFcnJvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvclRpbWVFbmQgPSAwXHJcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gNTBcclxuICAgICAgICAgICAgdGhpcy5lcnJvclByb2dyZXNzSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lcnJvclRpbWVFbmQgPiA1MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5lcnJvclByb2dyZXNzSW50ZXJ2YWwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zbGlkZXJOZXh0KClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yVGltZUVuZCArPSAxXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uUHJvZ3Jlc3ModGhpcy5lcnJvclRpbWVFbmQpXHJcbiAgICAgICAgICAgIH0sIDIwKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0RXJyb3JWaWV3KHN0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gdGhpcy52aWV3RXJyb3IpIHJldHVyblxyXG4gICAgICAgICAgICBpZiAoc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3Iuc3R5bGUuZGlzcGxheSA9IFwiXCJcclxuICAgICAgICAgICAgICAgIHRoaXMudmlld0Vycm9yID0gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAgICAgICAgIHRoaXMudmlld0Vycm9yID0gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBJbnN0YUdhbGxlcnkge1xyXG5cclxuICAgICAgICBmdWxsR2FsbGVyeUlzT3BlbiA9IGZhbHNlXHJcbiAgICAgICAgZnVsbEdhbGxlcnlWb2x1bWUgPSB0cnVlXHJcblxyXG4gICAgICAgIGluc3RhVmlkZW9MaXN0ID0gbmV3IEFycmF5KDApXHJcblxyXG4gICAgICAgIHN0YXRpYyBkZWxlZ2F0ZSgpIHtcclxuICAgICAgICAgICAgbGV0IGluc3RhR2FsbGVyeURPTSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5zdGEtZ2FsbGVyeVwiKVxyXG4gICAgICAgICAgICBpZiAoaW5zdGFHYWxsZXJ5RE9NKSBpbnN0YUdhbGxlcnlET00uZm9yRWFjaChlbGVtID0+IG5ldyB0aGlzKGVsZW0pKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoaW5zdGFHYWxsZXJ5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFHYWxsZXJ5ID0gaW5zdGFHYWxsZXJ5O1xyXG4gICAgICAgICAgICB0aGlzLnN3aXBlckxlZnQgPSB0aGlzLmluc3RhR2FsbGVyeS5xdWVyeVNlbGVjdG9yKFwiLmluc3RhLWdhbGxlcnlfX2xlZnQtYXJyb3dcIilcclxuICAgICAgICAgICAgdGhpcy5zd2lwZXJSaWdodCA9IHRoaXMuaW5zdGFHYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoXCIuaW5zdGEtZ2FsbGVyeV9fcmlnaHQtYXJyb3dcIilcclxuXHJcbiAgICAgICAgICAgIC8vc291bmQgYnV0dG9uXHJcbiAgICAgICAgICAgIHRoaXMuc291bmRCdXR0b24gPSB0aGlzLmluc3RhR2FsbGVyeS5xdWVyeVNlbGVjdG9yKFwiLmluc3RhLWdhbGxlcnktZnVsbF9fdm9sdW1lLWJ1dHRvblwiKVxyXG4gICAgICAgICAgICB0aGlzLnNvdW5kQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bGxHYWxsZXJ5U2V0Vm9sdW1lKCF0aGlzLmZ1bGxHYWxsZXJ5Vm9sdW1lKVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy9nYWxsZXJ5XHJcbiAgICAgICAgICAgIHRoaXMuc3dpcGVyID0gbmV3IFN3aXBlcih0aGlzLmluc3RhR2FsbGVyeS5xdWVyeVNlbGVjdG9yKFwiLmluc3RhLWdhbGxlcnlfX3N3aXBlclwiKSwge1xyXG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA4LjgsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiBcImF1dG9cIixcclxuICAgICAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICBwcmV2RWw6IHRoaXMuc3dpcGVyTGVmdCxcclxuICAgICAgICAgICAgICAgICAgICBuZXh0RWw6IHRoaXMuc3dpcGVyUmlnaHQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAxMjAwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIDEwMjM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA4LjhcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIDUxMjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDcuNDZcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy9mdWxsIGdhbGxlcnlcclxuICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeSA9IHRoaXMuaW5zdGFHYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoXCIuaW5zdGEtZ2FsbGVyeS1mdWxsXCIpXHJcbiAgICAgICAgICAgIHRoaXMuZnVsbEdhbGxlcnlDbG9zZSA9IHRoaXMuaW5zdGFHYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoXCIuaW5zdGEtZ2FsbGVyeS1mdWxsX19jbG9zZVwiKVxyXG4gICAgICAgICAgICB0aGlzLmZ1bGxHYWxsZXJ5V3JhcHBlciA9IHRoaXMuaW5zdGFHYWxsZXJ5LnF1ZXJ5U2VsZWN0b3IoXCIuaW5zdGEtZ2FsbGVyeS1mdWxsX19zd2lwZXIgLnN3aXBlci13cmFwcGVyXCIpXHJcblxyXG4gICAgICAgICAgICAvL25hdmlnYXRpb25cclxuICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeU5hdmlkYXRpb24gPSB0aGlzLmluc3RhR2FsbGVyeS5xdWVyeVNlbGVjdG9yKFwiLmluc3RhLWdhbGxlcnktZnVsbF9fbmF2aWdhdGlvblwiKVxyXG5cclxuICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeVdyYXBwZXIuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICB0aGlzLmZ1bGxHYWxsZXJ5TmF2aWRhdGlvbi5pbm5lckhUTUwgPSBcIlwiXHJcblxyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwXHJcblxyXG4gICAgICAgICAgICB0aGlzLnN3aXBlci5zbGlkZXMuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBpbWFnZSA9IGVsZW0ucXVlcnlTZWxlY3RvcihcIi5pbnN0YS1nYWxsZXJ5X19wcmV2aWV3XCIpXHJcbiAgICAgICAgICAgICAgICBsZXQgdmlkZW9TcmMgPSBlbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtdmlkZW9cIilcclxuXHJcbiAgICAgICAgICAgICAgICAvL0FkZCBvcGVuIHZpZGVvIGFjdGlvblxyXG4gICAgICAgICAgICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZ1bGxTd2lwZXIuc2xpZGVUbyhpbmRleCAtIDEsIDApXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeVNldE9wZW4odHJ1ZSlcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLy9pbml0aWFsaXplIHZpZGVvXHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3SW5zdGFWaWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgICAgICAgICAgICAgIG5ld0luc3RhVmlkZW8uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJpbnN0YS12aWRlb1wiKVxyXG4gICAgICAgICAgICAgICAgbmV3SW5zdGFWaWRlby5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluc3RhLXZpZGVvX19idXR0b25cIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8dmlkZW8gY2xhc3M9XCJpbnN0YS12aWRlb19fcGxheWVyXCIgc3JjPVwiJHt2aWRlb1NyY31cIiBwbGF5c2lubGluZSBwcmVsb2FkPVwibWV0YWRhdGFcIiB3ZWJraXQtcGxheXNpbmxpbmUgbXV0ZWQ+PC92aWRlbz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5zdGEtdmlkZW9fX2Vycm9yXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lXCI+0J7RiNC40LHQutCwPGJyPtCd0LUg0YPQtNCw0LvQvtGB0Ywg0LfQsNCz0YDRg9C30LjRgtGMINGA0L7Qu9C40LouPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluc3RhLXZpZGVvX19wcmVsb2FkZXJcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICBgXHJcblxyXG4gICAgICAgICAgICAgICAgLy9pbml0aWFsaXplIHNvdW5kIGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgbGV0IHNvdW5kQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgICAgICAgICAgICAgc291bmRCdXR0b24uY2xhc3NMaXN0LmFkZChcImluc3RhLWdhbGxlcnktZnVsbF9fc291bmRcIilcclxuICAgICAgICAgICAgICAgIHNvdW5kQnV0dG9uLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMzFcIiBoZWlnaHQ9XCIxOFwiIHZpZXdCb3g9XCIwIDAgMzEgMThcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTEyIDBMNyA0SDBWMTRIN0wxMiAxOFYwWk0yOS4yOTI5IDIuMjkyODlMMjQuNSA3LjA4NTc5TDE5LjcwNzEgMi4yOTI4OUwxOC4yOTI5IDMuNzA3MTFMMjMuMDg1OCA4LjVMMTguMjkyOSAxMy4yOTI5TDE5LjcwNzEgMTQuNzA3MUwyNC41IDkuOTE0MjFMMjkuMjkyOSAxNC43MDcxTDMwLjcwNzEgMTMuMjkyOUwyNS45MTQyIDguNUwzMC43MDcxIDMuNzA3MTFMMjkuMjkyOSAyLjI5Mjg5WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cclxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMzFcIiBoZWlnaHQ9XCIxOFwiIHZpZXdCb3g9XCIwIDAgMzEgMThcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTEyIDBMNyA0SDBWMTRIN0wxMiAxOFYwWk0yMiAyQzI1Ljg2NiAyIDI5IDUuMTM0MDEgMjkgOUMyOSAxMi44NjYgMjUuODY2IDE2IDIyIDE2SDE4VjE4SDIyQzI2Ljk3MDYgMTggMzEgMTMuOTcwNiAzMSA5QzMxIDQuMDI5NDQgMjYuOTcwNiAwIDIyIDBIMThWMkgyMlpNMjUgOUMyNSA3LjM0MzE1IDIzLjY1NjkgNiAyMiA2SDE4VjRIMjJDMjQuNzYxNCA0IDI3IDYuMjM4NTggMjcgOUMyNyAxMS43NjE0IDI0Ljc2MTQgMTQgMjIgMTRIMThWMTJIMjJDMjMuNjU2OSAxMiAyNSAxMC42NTY5IDI1IDlaXCIgZmlsbD1cIndoaXRlXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICAgICAgbmV3SW5zdGFWaWRlby5hcHBlbmRDaGlsZChzb3VuZEJ1dHRvbilcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3U2xpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICAgICAgICAgICAgICBuZXdTbGlkZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInN3aXBlci1zbGlkZVwiKVxyXG4gICAgICAgICAgICAgICAgbmV3U2xpZGUuYXBwZW5kQ2hpbGQobmV3SW5zdGFWaWRlbylcclxuICAgICAgICAgICAgICAgIHRoaXMuZnVsbEdhbGxlcnlXcmFwcGVyLmFwcGVuZENoaWxkKG5ld1NsaWRlKVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFWaWRlb0xpc3QucHVzaChuZXcgSW5zdGFWaWRlbyhuZXdJbnN0YVZpZGVvLCBpbmRleCwgbmV3U2xpZGUsIHRoaXMpKVxyXG5cclxuICAgICAgICAgICAgICAgIGluZGV4KytcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bGxHYWxsZXJ5TmF2aWRhdGlvbi5pbm5lckhUTUwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluc3RhLWdhbGxlcnktZnVsbF9fbmF2aWdhdGlvbi1saW5lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluc3RhLWdhbGxlcnktZnVsbF9fbmF2aWdhdGlvbi1saW5lLXByb2dyZXNzXCIgc3R5bGU9XCJ3aWR0aDogMFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vZnVsbCBzd2lwZXJcclxuICAgICAgICAgICAgdGhpcy5mdWxsU3dpcGVyID0gbmV3IFN3aXBlcih0aGlzLmluc3RhR2FsbGVyeS5xdWVyeVNlbGVjdG9yKFwiLmluc3RhLWdhbGxlcnktZnVsbF9fc3dpcGVyXCIpLCB7XHJcbiAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDAsXHJcbiAgICAgICAgICAgICAgICBzcGVlZDogMzAwLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dUb3VjaE1vdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAxMjAwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogNDJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIDEwMjM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAzMVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgNTEyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjdcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLmZ1bGxHYWxsZXJ5Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnVsbEdhbGxlcnlTZXRPcGVuKGZhbHNlKVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy9mdWxsIHN3aXBlciBhY3Rpb25zXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFWaWRlb0xpc3QuZm9yRWFjaCgodmlkZW8sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2aWRlby5zd2lwZXIgPSB0aGlzLmZ1bGxTd2lwZXJcclxuICAgICAgICAgICAgICAgIHZpZGVvLmFsbFZpZGVvcyA9IHRoaXMuaW5zdGFWaWRlb0xpc3RcclxuICAgICAgICAgICAgICAgIHZpZGVvLm9uU2xpZGVyRW5kID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnVsbEdhbGxlcnlTZXRPcGVuKGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy9OYXZpZ2F0aW9uIGFjdGlvblxyXG4gICAgICAgICAgICB0aGlzLmZ1bGxTd2lwZXIub24oXCJzbGlkZUNoYW5nZVwiLCBzd2lwZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeU5hdmlkYXRpb24ucXVlcnlTZWxlY3RvckFsbChcIi5pbnN0YS1nYWxsZXJ5LWZ1bGxfX25hdmlnYXRpb24tbGluZVwiKS5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0ucXVlcnlTZWxlY3RvcihcIi5pbnN0YS1nYWxsZXJ5LWZ1bGxfX25hdmlnYXRpb24tbGluZS1wcm9ncmVzc1wiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCBzd2lwZXIuYWN0aXZlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNGRkZcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSBzd2lwZXIuYWN0aXZlSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5xdWVyeVNlbGVjdG9yKFwiLmluc3RhLWdhbGxlcnktZnVsbF9fbmF2aWdhdGlvbi1saW5lLXByb2dyZXNzXCIpLnN0eWxlLmRpc3BsYXkgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBlbGVtLnF1ZXJ5U2VsZWN0b3IoXCIuaW5zdGEtZ2FsbGVyeS1mdWxsX19uYXZpZ2F0aW9uLWxpbmUtcHJvZ3Jlc3NcIikuc3R5bGUud2lkdGggPSBcIjBcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vUHJvZ3Jlc3MgYWN0aW9uXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFWaWRlb0xpc3QuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZW0ub25Qcm9ncmVzcyA9IChwcm9ncmVzcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsaW5lID0gdGhpcy5mdWxsR2FsbGVyeU5hdmlkYXRpb24uY2hpbGRyZW5baW5kZXhdLnF1ZXJ5U2VsZWN0b3IoXCIuaW5zdGEtZ2FsbGVyeS1mdWxsX19uYXZpZ2F0aW9uLWxpbmUtcHJvZ3Jlc3NcIilcclxuICAgICAgICAgICAgICAgICAgICBsaW5lLnN0eWxlLndpZHRoID0gKHByb2dyZXNzIC8gZWxlbS5sZW5ndGgpICogMTAwICsgXCIlXCJcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlbGVtLm9uRW5kID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZ1bGxTd2lwZXIuYWN0aXZlSW5kZXggPT09IHRoaXMuZnVsbFN3aXBlci5zbGlkZXMubGVuZ3RoIC0gMSkgdGhpcy5mdWxsR2FsbGVyeVNldE9wZW4oZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB0aGlzLmZ1bGxTd2lwZXIuc2xpZGVOZXh0KClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vdm9sdW1lIGJ1dHRvblxyXG4gICAgICAgICAgICB0aGlzLmZ1bGxHYWxsZXJ5U2V0Vm9sdW1lKClcclxuXHJcbiAgICAgICAgICAgIC8va2V5Ym9hcmQgYnV0dG9ucyBhY3Rpb25zXHJcbiAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGV2ZW50ID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeVNldE9wZW4oZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCIgXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mdWxsR2FsbGVyeUlzT3BlbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeVNldFBsYXkoIXRoaXMuaXNQbGF5KVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiQXJyb3dMZWZ0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoMCA+IHRoaXMuZnVsbFN3aXBlci5hY3RpdmVJbmRleCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeVNldE9wZW4oZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZ1bGxHYWxsZXJ5U2xpZGVUbyh0aGlzLmZ1bGxTd2lwZXIuYWN0aXZlSW5kZXggLSAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFWaWRlb0xpc3QuZm9yRWFjaChlbGVtID0+IGVsZW0udXBkYXRlVmlld1NvdW5kQnV0dG9uKCkpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gXCJBcnJvd1JpZ2h0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5mdWxsU3dpcGVyLnNsaWRlcy5sZW5ndGggPCB0aGlzLmZ1bGxTd2lwZXIuYWN0aXZlSW5kZXggKyAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnVsbEdhbGxlcnlTZXRPcGVuKGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeVNsaWRlVG8odGhpcy5mdWxsU3dpcGVyLmFjdGl2ZUluZGV4ICsgMSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluc3RhVmlkZW9MaXN0LmZvckVhY2goZWxlbSA9PiBlbGVtLnVwZGF0ZVZpZXdTb3VuZEJ1dHRvbigpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vQ2xpY2sgb3RoZXIgYWN0aW9uXHJcbiAgICAgICAgICAgIHRoaXMuZnVsbEdhbGxlcnkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBpc1RhcmdldCA9IGV2ZW50LnRhcmdldCA9PT0gdGhpcy5mdWxsR2FsbGVyeVxyXG4gICAgICAgICAgICAgICAgaWYoaXNUYXJnZXQpIHRoaXMuZnVsbEdhbGxlcnlTZXRPcGVuKGZhbHNlKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNQbGF5ID0gZmFsc2VcclxuXHJcbiAgICAgICAgZnVsbEdhbGxlcnlTZXRQbGF5KHN0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gdGhpcy5pc1BsYXkpIHJldHVyblxyXG4gICAgICAgICAgICB0aGlzLmlzUGxheSA9ICEhc3RhdGU7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGxheSgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cGRhdGVQbGF5KCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mdWxsR2FsbGVyeUlzT3BlbiAmJiB0aGlzLmlzUGxheSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YVZpZGVvTGlzdC5mb3JFYWNoKHZpZGVvID0+IHZpZGVvLnNldFBsYXkoZmFsc2UpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YVZpZGVvTGlzdFt0aGlzLmZ1bGxTd2lwZXIuYWN0aXZlSW5kZXhdLnNldFBsYXkodHJ1ZSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFWaWRlb0xpc3QuZm9yRWFjaCh2aWRlbyA9PiB2aWRlby5zZXRQbGF5KGZhbHNlKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVsbEdhbGxlcnlTbGlkZVRvKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnVsbFN3aXBlci5zbGlkZVRvKGluZGV4KVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYXkoKVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhVmlkZW9MaXN0LmZvckVhY2goZWxlbSA9PiBlbGVtLnVwZGF0ZVN0eWxlKCkpXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFWaWRlb0xpc3QuZm9yRWFjaCh2aWRlbyA9PiB2aWRlby5zZXRQcm9ncmVzcygwKSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bGxHYWxsZXJ5U2V0T3BlbihzdGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5mdWxsR2FsbGVyeUlzT3BlbiA9PT0gc3RhdGUpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeS5zdHlsZS5kaXNwbGF5ID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeUlzT3BlbiA9IHRydWVcclxuICAgICAgICAgICAgICAgIHRoaXMuZnVsbEdhbGxlcnlTZXRQbGF5KHRydWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhVmlkZW9MaXN0LmZvckVhY2goZWxlbSA9PiBlbGVtLnVwZGF0ZVN0eWxlKCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhVmlkZW9MaXN0LmZvckVhY2godmlkZW8gPT4gdmlkZW8uc2V0UHJvZ3Jlc3MoMCkpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bGxHYWxsZXJ5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxyXG4gICAgICAgICAgICAgICAgdGhpcy5mdWxsR2FsbGVyeUlzT3BlbiA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bGxHYWxsZXJ5U2V0UGxheShmYWxzZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVsbEdhbGxlcnlTZXRWb2x1bWUoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmZ1bGxHYWxsZXJ5Vm9sdW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bGxHYWxsZXJ5LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW5zdGEtZ2FsbGVyeS1mdWxsX19zd2lwZXIgLnN3aXBlci13cmFwcGVyIC5zd2lwZXItc2xpZGVcIikuZm9yRWFjaCgoZWxlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmlkZW8gPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoXCJ2aWRlb1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZpZGVvLm11dGVkID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnVsbEdhbGxlcnkucXVlcnlTZWxlY3RvckFsbChcIi5pbnN0YS1nYWxsZXJ5LWZ1bGxfX3N3aXBlciAuc3dpcGVyLXdyYXBwZXIgLnN3aXBlci1zbGlkZVwiKS5mb3JFYWNoKChlbGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2aWRlbyA9IGVsZW0ucXVlcnlTZWxlY3RvcihcInZpZGVvXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmlkZW8ubXV0ZWQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmZ1bGxHYWxsZXJ5Vm9sdW1lID0gIXRoaXMuZnVsbEdhbGxlcnlWb2x1bWVcclxuICAgICAgICAgICAgdGhpcy5pbnN0YVZpZGVvTGlzdC5mb3JFYWNoKGVsZW0gPT4gZWxlbS51cGRhdGVWaWV3U291bmRCdXR0b24oKSlcclxuXHJcbiAgICAgICAgICAgIC8vYnV0dG9uIGljb24gdXBkYXRlXHJcbiAgICAgICAgICAgIGxldCBidXR0b25JY29ucyA9IHRoaXMuc291bmRCdXR0b24ucXVlcnlTZWxlY3RvckFsbChcInN2Z1wiKVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZnVsbEdhbGxlcnlWb2x1bWUpIHtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbkljb25zWzBdLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIlxyXG4gICAgICAgICAgICAgICAgYnV0dG9uSWNvbnNbMV0uc3R5bGUuZGlzcGxheSA9IFwiXCJcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbkljb25zWzBdLnN0eWxlLmRpc3BsYXkgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICBidXR0b25JY29uc1sxXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBJbnN0YUdhbGxlcnkuZGVsZWdhdGUoKVxyXG59Il0sImZpbGUiOiJzdG9yaWVzLWNvcHkuanMifQ==