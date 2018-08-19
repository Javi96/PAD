package com.pad.slaythespire;

import android.net.Uri;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;

public class LoginSignActivity extends AppCompatActivity implements
        LoginFragment.OnFragmentInteractionListener,
        SignupFragment.OnFragmentInteractionListener{

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login_sign);
    }


    @Override
    public void onFragmentInteraction(Uri uri) {

    }
}
