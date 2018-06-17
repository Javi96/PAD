package prueba.myapplication;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        final WebView webView = findViewById(R.id.webview);
        webView.loadUrl("file:///android_asset/example.html");
        webView.getSettings().setJavaScriptEnabled(true);
    }
}
