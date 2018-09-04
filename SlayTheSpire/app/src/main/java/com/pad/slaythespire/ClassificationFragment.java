package com.pad.slaythespire;


import android.app.AlertDialog;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.AccelerateDecelerateInterpolator;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.view.animation.LinearInterpolator;
import android.view.animation.TranslateAnimation;
import android.widget.Button;
import android.widget.Toast;

import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;


/**
 * A simple {@link Fragment} subclass.
 */
public class ClassificationFragment extends Fragment {


    private DatabaseReference databaseReference;


    public ClassificationFragment() {
        // Required empty public constructor
    }



    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment



        /*ArrayList<String> dataList = new ArrayList<>();
        dataList.add("hiii");
        dataList.add("hooo");
        View view = inflater.inflate(R.layout.fragment_classification, container, false);
        RecyclerView recyclerView  = view.findViewById(R.id.recycle_view_classification);
        recyclerView.setLayoutManager(new LinearLayoutManager(this.getActivity()));

        ClassificationAdapter classificationAdapter = new ClassificationAdapter(dataList);
        recyclerView.setAdapter(classificationAdapter);


        return inflater.inflate(R.layout.fragment_classification, container, false);*/

        databaseReference = FirebaseDatabase.getInstance().getReference();

        final ArrayList<DataSnapshot> users = new ArrayList<>();
        final ArrayList<String> dataList = new ArrayList<>();
        for (int i=0; i<4; i++){
            dataList.add("Dato:" + i);
        }

        Query query = databaseReference.child("users").orderByChild("points");
        query.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                if (dataSnapshot.exists()) {
                    for (DataSnapshot game : dataSnapshot.getChildren()) {
                        Log.d("data: ", game.child("email").toString());
                        users.add(game);
                    }


                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });

        View view = inflater.inflate(R.layout.fragment_classification, container, false);
        final RecyclerView recyclerView  = view.findViewById(R.id.recycle_view_classification);
        recyclerView.setLayoutManager(new LinearLayoutManager(this.getActivity(), LinearLayoutManager.VERTICAL, false));


        /*MediaController mediaController = new MediaController(this.getActivity());
        VideoView videoView = view.findViewById(R.id.video);
        String videoPath = "android.resource://com.pad.slaythespire/raw/crop";
        Uri uri = Uri.parse(videoPath);
        videoView.setVideoURI(uri);
        videoView.setMediaController(mediaController);
        mediaController.setAnchorView(videoView);
        videoView.start();*/

        final ClassificationAdapter classificationAdapter = new ClassificationAdapter(dataList, users);
        classificationAdapter.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getContext(), "Selected " +
                        dataList.get(recyclerView.getChildAdapterPosition(v)), Toast.LENGTH_LONG).show();
                //startActivity(new Intent(getActivity(), FriendRequestActivity.class));
                AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
                View newView = getLayoutInflater().inflate(R.layout.activity_friend_request,null);
                builder.setView(newView);
                AlertDialog alertDialog = builder.create();
                alertDialog.show();
            }
        });

        recyclerView.setAdapter(classificationAdapter);


















        return view;
    }

}
