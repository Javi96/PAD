package com.pad.test2.myapplication;

import android.os.Bundle;
import android.app.Activity;
import android.support.annotation.NonNull;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;

import java.util.HashMap;

public class ConfigurationActivity extends Activity {

    private Button saveData;

    private EditText editTextName;

    private DatabaseReference databaseReference;


    private FirebaseAuth firebaseAuth;

    private FirebaseUser firebaseUser;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_configuration);
        databaseReference = FirebaseDatabase.getInstance().getReference();
        editTextName = findViewById(R.id.config_name);
        saveData = findViewById(R.id.config_save_data);
    }

    @Override
    protected void onStart() {
        super.onStart();
    }
}
