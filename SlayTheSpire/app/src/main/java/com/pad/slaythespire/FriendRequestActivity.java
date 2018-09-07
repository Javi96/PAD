package com.pad.slaythespire;

import android.os.Bundle;
import android.app.Activity;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.DisplayMetrics;
import android.util.Log;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;

public class FriendRequestActivity extends AppCompatActivity {

    private FriendRequestAdapter friendRequestAdapter;

    private RecyclerView recyclerView;

    private ArrayList<String> dataList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_friend_request);

        /*DisplayMetrics displayMetrics = new DisplayMetrics();
        getWindowManager().getDefaultDisplay().getMetrics(displayMetrics);

        int width = displayMetrics.widthPixels;
        int height = displayMetrics.heightPixels;

        getWindow().setLayout(width/2, height/2);*/
        recyclerView = findViewById(R.id.recycle_view_friend_requests);
        recyclerView.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false));

        dataList = new ArrayList<>();

        Query query = FirebaseDatabase.getInstance().getReference().child("friend_requests").child(FirebaseAuth.getInstance().getCurrentUser().getUid());
        query.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                if (dataSnapshot.exists()) {
                    dataList.clear();
                    for (DataSnapshot data : dataSnapshot.getChildren()) {
                        Log.e("data_fr", data.child("name").getValue().toString());
                        dataList.add(data.child("name").getValue().toString());
                    }
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });

        friendRequestAdapter = new FriendRequestAdapter(dataList);
        recyclerView.setAdapter(friendRequestAdapter);
    }


    @Override
    protected void onStart() {
        super.onStart();

    }
}
