package com.pad.slaythespire;


import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.auth.api.signin.GoogleSignInStatusCodes;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.SignInButton;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.tasks.Task;


public class LoginActivity extends AppCompatActivity implements GoogleApiClient.OnConnectionFailedListener, View.OnClickListener {


    private GoogleSignInClient client;
    private GoogleSignInOptions options;
    private GoogleSignInAccount account;
    private SignInButton signInButton;

    private static int RC_SIGN_IN = 100;
    private static String TAG = "INFO";

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        this.options = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestEmail()
                .build();
        this.client = GoogleSignIn.getClient(this, options);
        this.signInButton = findViewById(R.id.sign_in_button);
        //this.signInButton.setSize(SignInButton.SIZE_STANDARD);

        findViewById(R.id.sign_in_button).setOnClickListener(this);
    }

    @Override
    protected void onStart() {
        super.onStart();
        this.account = GoogleSignIn.getLastSignedInAccount(this);
        if(account!=null){
            this.handleLastSignedInAccount(this.account);
        }

    }

    private void handleLastSignedInAccount(GoogleSignInAccount account) {
        Log.i(TAG, "Last singed account");
        Log.i(TAG, "Name: " + this.account.getDisplayName());
        Log.i(TAG, "Email: " + this.account.getEmail());
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.sign_in_button:
                Toast.makeText(this, "sign_in_button", Toast.LENGTH_LONG).show();
                signIn();
                break;
            case R.id.login:
                Toast.makeText(this, "login button", Toast.LENGTH_LONG).show();
                break;
            case R.id.link_sign_up:
                Toast.makeText(this, "sign up button", Toast.LENGTH_LONG).show();
                Intent intent = new Intent(this, SignupActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(intent);
                break;
            default:
                break;
        }
    }

    private void signIn() {
        Intent signInIntent = client.getSignInIntent();
        startActivityForResult(signInIntent, RC_SIGN_IN);

    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        // Result returned from launching the Intent from GoogleSignInClient.getSignInIntent(...);
        if (requestCode == RC_SIGN_IN) {
            //GoogleSignInResult result = Auth.GoogleSignInApi.getSignInResultFromIntent(data);
            //int statusCode = result.getStatus().getStatusCode();
            //Log.w(TAG, "Status code: " + statusCode);
            //Log.v(TAG, "Account: " + result.getSignInAccount());
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            handleSignInResult(task);
        }
    }

    private void handleSignInResult(Task<GoogleSignInAccount> completedTask) {
        try {
            this.account = completedTask.getResult(ApiException.class);
            Log.v(TAG, "Name: " + this.account.getDisplayName());
            Log.v(TAG, "Email: " + this.account.getEmail());
            Intent intent = new Intent(this, MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(intent);
            //updateUI(account);
        } catch (ApiException e) {
            Log.w(TAG, "signInResult:failed code=" + e.getStatusCode());
            switch(e.getStatusCode()){
                case GoogleSignInStatusCodes.SIGN_IN_REQUIRED:
                    break;
                case GoogleSignInStatusCodes.NETWORK_ERROR:
                    break;
                case GoogleSignInStatusCodes.INVALID_ACCOUNT:
                    break;
                case GoogleSignInStatusCodes.INTERNAL_ERROR:
                    break;
            }
            //updateUI(null);
        }
    }



















    @Override
    protected void onStop() {
        super.onStop();
    }

    @Override
    protected void onPostResume() {
        super.onPostResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
    }

    @Override
    public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {

    }
}
