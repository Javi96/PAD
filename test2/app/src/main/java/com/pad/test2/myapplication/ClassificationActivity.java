package com.pad.test2.myapplication;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.ArrayAdapter;
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
        setContentView(R.layout.activity_classification);

        databaseReference = FirebaseDatabase.getInstance().getReference();

        tableLayout = findViewById(R.id.list);
        row = (TableRow ) findViewById(R.id.row2);
        leaderboard = (TextView ) findViewById(R.id.rank);

        this.rows = new ArrayList<>();


    }

    @Override
    protected void onStart() {
        super.onStart();

        Query query = databaseReference.child("users").orderByChild("email");
        query.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                if (dataSnapshot.exists()) {
                    //existe
                    int i = 1;
                    for (DataSnapshot issue : dataSnapshot.getChildren()) {
                        for (DataSnapshot game : issue.child("games").getChildren()) {
                            rows.add(new String[]{Integer.toString(i++),
                                    (String ) issue.child("name").getValue(),
                                    (String) game.getValue()});
                        }
                    }
                    tableDynamic = new TableDynamic(tableLayout, getApplicationContext(), rows, row.getLayoutParams(), leaderboard.getLayoutParams());

                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }


}
