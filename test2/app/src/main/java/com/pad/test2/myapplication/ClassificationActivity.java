package com.pad.test2.myapplication;

import android.app.Activity;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.NavUtils;
import android.support.v4.app.TaskStackBuilder;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.HashMap;

public class ClassificationActivity extends AppCompatActivity {

    protected ArrayList<String[]> rows;
    private TableDynamic tableDynamic;
    private TableLayout tableLayout;
    private TableRow row;
    private TextView leaderboard;
    private DatabaseReference databaseReference;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_classification);

        databaseReference = FirebaseDatabase.getInstance().getReference();
        tableLayout = findViewById(R.id.list);
        row = ( TableRow ) findViewById(R.id.row2);
        leaderboard = ( TextView ) findViewById(R.id.rank);

        this.rows = new ArrayList<>();


    }

    @Override
    protected void onStart() {
        super.onStart();

        Query query = databaseReference.child("games").orderByChild("score");
        query.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                if (dataSnapshot.exists()) {
                    //existe
                    int i = 1;
                    for (DataSnapshot game : dataSnapshot.getChildren()) {
                        rows.add(new String[]{Integer.toString(i++),
                                ( String ) game.child("user").getValue(),
                                ( String ) game.child("score").getValue()});
                    }

                    tableDynamic = new TableDynamic(tableLayout, getApplicationContext(), rows, row.getLayoutParams(), leaderboard.getLayoutParams());

                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }

    /*@Override
    public void onBackPressed() {
        Intent intent = new Intent(this, MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
        System.out.print("-----------------------------------------------------------" +
                "--------------------------------------------------------" +
                "----------------------------------------------------");*/

    @Override
    public void onBackPressed() {
        finish();

    }

    @Override
    public void onRestoreInstanceState(Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
    }
}



