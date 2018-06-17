package com.pad.slaythespire;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebView;

public class TestHTML extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test_html);

        final WebView webView = findViewById(R.id.webview);
        webView.loadUrl("file:///android_asset/example.html");

    }
}
