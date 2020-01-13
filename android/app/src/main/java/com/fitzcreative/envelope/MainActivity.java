package com.fitzcreative.envelope;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import android.content.res.Configuration;

// React Navigation
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
// SplashScreen
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "envelope";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    switch (getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK) {
      case Configuration.UI_MODE_NIGHT_YES:
        setTheme(R.style.DarkTheme);
        break;
      case Configuration.UI_MODE_NIGHT_NO:
        setTheme(R.style.LightTheme);
        break;
      default:
        setTheme(R.style.LightTheme);
    }

    SplashScreen.show(this, true);
    super.onCreate(savedInstanceState);
  }

  /**
   * React Navigation
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
        return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
}
