package com.pad.slaythespire;

import android.Manifest;
import android.content.ContentResolver;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.os.Bundle;
import android.app.Activity;
import android.provider.ContactsContract;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import java.util.ArrayList;

import static android.support.constraint.Constraints.TAG;

public class Contacts extends Activity {

    private ListView mContactsList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contacts);


        mContactsList = (ListView) findViewById(R.id.contact_list);

        ArrayList<String> data = new ArrayList<>();
        data.add("name");
        data.add("name2");


        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, R.layout.list_contacts, data);
        mContactsList.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Object item = ((ArrayAdapter) mContactsList.getAdapter()).getItem(position);
                ((ArrayAdapter) mContactsList.getAdapter()).remove(item);
            }
        });
        mContactsList.setAdapter(adapter);

    }

}
