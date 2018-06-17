package com.pad.test2.myapplication;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

import java.util.ArrayList;

public class ClassificationActivity extends AppCompatActivity {

    private ArrayList<String[]> rows;
    private TableDynamic tableDynamic;
    private TableLayout tableLayout;
    private TableRow row;
    private TextView leaderboard;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_classification);

        tableLayout = findViewById(R.id.list);
        row = (TableRow ) findViewById(R.id.row2);
        leaderboard = (TextView ) findViewById(R.id.rank);

        this.rows = new ArrayList<>();
        this.getData();
        tableDynamic = new TableDynamic(tableLayout, getApplicationContext(), rows, row.getLayoutParams(), leaderboard.getLayoutParams());


    }

    private void getData(){
        this.rows.add(new String[]{"1","Name1","Points1"});
        this.rows.add(new String[]{"2","Name2","Points2"});
        this.rows.add(new String[]{"3","Name3","Points3"});
        this.rows.add(new String[]{"4","Name4","Points4"});
        this.rows.add(new String[]{"5","Name5","Points5"});
    }
}
