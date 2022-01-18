import './reset.min.css';
import './style.css';

/**
 * VideoControl
 */
class VideoControl {
  public videoElem;
  public videoDuration; // ビデオの総再生時間
  public wrapperElem = document.querySelector<HTMLElement>('.wrapper')!;
  public scrollMax = this.wrapperElem.clientHeight - window.innerHeight; // スクロールの最大値
  public ratio = 0;

  constructor(videoElem: HTMLMediaElement) {
    this.videoElem = videoElem;
    this.videoDuration = this.videoElem.duration;
  }

  /**
   * scrollAction
   * スクロール値に合わせてビデオの再生位置をずらす
   */
  public movePlayPointWithScroll(): void {
    this.ratio = this.calculateScrollRatio();
    let currentPlayPoint = this.videoDuration * this.ratio;
    this.videoElem.currentTime = currentPlayPoint;
    console.log("🍇", currentPlayPoint);
  }

  /**
   * initPlayTime
   * プロパティのinitialize
   */
  public initPlayPoint(): void {
    this.ratio = this.calculateScrollRatio();
    this.videoElem.currentTime = this.videoDuration * this.ratio;
  }

  /**
   * calculateScrollRatio
   * 現在のスクロール比率を計算する
   * @returns {number} scrollRatio - 現在のスクロール比率
   */
  private calculateScrollRatio(): number {
    let scrollY = window.scrollY; // 現在のスクロール値
    let scrollRatio = scrollY / this.scrollMax;
    return scrollRatio;
  }
}


window.onload = () => {
  const videoElem = document.querySelector<HTMLMediaElement>('video')!;
  const videoControl = new VideoControl(videoElem);

  videoElem.onloadeddata = () => {
    videoControl.initPlayPoint();
    window.addEventListener('scroll', () => {
      videoControl.movePlayPointWithScroll();
    });
  }
}



