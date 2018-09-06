package com.pad.slaythespire;


import android.app.AlertDialog;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
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


    private ClassificationAdapter classificationAdapter;
    private RecyclerView recyclerView;
    private View view;
    private Query query;
    private ArrayList<DataSnapshot> users;
    private ArrayList<String> dataList;


    public ClassificationFragment() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        users = new ArrayList<>();
        dataList = new ArrayList<>();
        Log.e("oncreate", "clfr");

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        Log.e("onCreateView", "clfr");


        /*ArrayList<String> dataList = new ArrayList<>();
        dataList.add("hiii");
        dataList.add("hooo");
        View view = inflater.inflate(R.layout.fragment_classification, container, false);
        RecyclerView recyclerView  = view.findViewById(R.id.recycle_view_classification);
        recyclerView.setLayoutManager(new LinearLayoutManager(this.getActivity()));

        ClassificationAdapter classificationAdapter = new ClassificationAdapter(dataList);
        recyclerView.setAdapter(classificationAdapter);


        return inflater.inflate(R.layout.fragment_classification, container, false);*/

        query = FirebaseDatabase.getInstance().getReference().child("users").orderByChild("points");
        query.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                if (dataSnapshot.exists()) {
                    users.clear();

                    for (DataSnapshot game : dataSnapshot.getChildren()) {
                        Log.e("data", game.child("name").toString());

                        users.add(game);
                    }


                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });

        view = inflater.inflate(R.layout.fragment_classification, container, false);
        recyclerView = view.findViewById(R.id.recycle_view_classification);
        recyclerView.setLayoutManager(new LinearLayoutManager(this.getActivity(), LinearLayoutManager.VERTICAL, false));
        classificationAdapter = new ClassificationAdapter();
        classificationAdapter.addData(users);
        classificationAdapter.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.e("tag____", users.get(recyclerView.getChildAdapterPosition(v)).child("protect").getValue().toString());
                if(users.get(recyclerView.getChildAdapterPosition(v)).child("protect").getValue().toString().equalsIgnoreCase("false")) {
                    Toast.makeText(getContext(), "Selected " +
                            users.get(recyclerView.getChildAdapterPosition(v)), Toast.LENGTH_LONG).show();
                    //startActivity(new Intent(getActivity(), FriendRequestActivity.class));
                    AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
                    View newView = getLayoutInflater().inflate(R.layout.activity_friend_request, null);
                    builder.setView(newView);
                    AlertDialog alertDialog = builder.create();
                    alertDialog.show();
                }
            }
        });
        recyclerView.setAdapter(classificationAdapter);


















        return view;
    }


    @Override
    public void onResume() {
        super.onResume();
        Log.e("resume", "resume");

    }


}
