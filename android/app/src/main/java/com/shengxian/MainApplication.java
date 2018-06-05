package com.shengxian;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecomponent.amaplocation.RCTAMapLocationPackage;
import com.theweflex.react.WeChatPackage;
import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;
import cn.reactnative.alipay.AlipayPackage;
import com.microsoft.codepush.react.CodePush;
import com.theweflex.react.WeChatPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.rnfs.RNFSPackage;
import com.rnim.rn.audio.ReactNativeAudioPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
//import com.imagepicker.ImagePickerPackage;
import com.beefe.picker.PickerViewPackage;
import com.reactnativecomponent.amap.RCTAMapPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.theweflex.react.WeChatPackage;
import cn.reactnative.alipay.AlipayPackage;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }
    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new WeChatPackage(),
            new AlipayPackage(),
            new LinearGradientPackage(),
            new RNFSPackage(),
            new ReactNativeAudioPackage(),
            new RNSoundPackage(),
            new PickerPackage(),
            new PickerViewPackage(),
            new RCTAMapPackage(),
            new SplashScreenReactPackage(),
			new MainReactPackage(),
            new RCTAMapLocationPackage(),
            new WeChatPackage(),
            new ReactNativeExceptionHandlerPackage(),
            new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
