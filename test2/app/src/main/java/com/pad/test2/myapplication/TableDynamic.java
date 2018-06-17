package com.pad.test2.myapplication;

import android.content.Context;
import android.graphics.Color;
import android.graphics.Paint;
import android.view.Gravity;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

import java.util.ArrayList;

public class TableDynamic {
    private TableLayout tableLayout;
    private Context context;
    private String[] header = {"a", "b", "c"};
    private TableRow row;
    private ViewGroup.LayoutParams rowParams;
    private ViewGroup.LayoutParams cellParams;

    private TextView cell;
    private ViewGroup.LayoutParams params;

    public TableDynamic(TableLayout tableLayout, Context context, ArrayList<String[]> data, ViewGroup.LayoutParams row, ViewGroup.LayoutParams cell) {
        this.tableLayout = tableLayout;
        this.context = context;
        this.cellParams = cell;
        this.rowParams = row;
        //this.createHeader();
        this.fillTable(data);
    }

    public void addHeader(String[] header){
        this.header = header;

    }

    private void newRow(){
        this.row = new TableRow(this.context);
    }

    private void newCell(){
        this.cell = new TextView(context);
        this.cell.setGravity(Gravity.CENTER);
    }

    private void createHeader(){
        newRow();
        for(String s: this.header){
            newCell();
            this.cell.setText(s);
            this.cell.setWidth(0);
            this.cell.setGravity(Gravity.LEFT);
            this.cell.setTextColor(Color.WHITE);
            this.row.addView(this.cell, this.cellParams);
        }
        this.tableLayout.addView(this.row, this.rowParams);
    }

    private TableRow.LayoutParams newTableRowParams(){
        TableRow.LayoutParams params = new TableRow.LayoutParams();
        params.setMargins(1,1,1,1);
        params.setMarginStart(20);
        params.setMarginEnd(20);
        params.weight = 2;
        return params;
    }

    private void fillTable(ArrayList<String[]> data){
        for(int i=0; i<data.size(); i++){
            newRow();
            for(String s: data.get(i)){
                newCell();
                this.cell.setText(s);
                this.cell.setGravity(Gravity.LEFT);
                this.cell.setTextColor(Color.WHITE);
                this.cell.setLayoutParams(this.cellParams);


                this.row.addView(this.cell);
            }
            this.tableLayout.addView(this.row, this.rowParams);
        }
    }
}
