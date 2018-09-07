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
import android.widget.SimpleCursorAdapter;
import android.widget.Toast;

import com.google.android.gms.common.internal.safeparcel.SafeParcelable;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;
import com.pranavpandey.android.dynamic.toasts.DynamicToast;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Objects;


/**
 * A simple {@link Fragment} subclass.
 */
public class ClassificationFragment extends Fragment {

    private DatabaseReference databaseReference;

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
        databaseReference = FirebaseDatabase.getInstance().getReference();

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
                    sendFriendRequest(users.get(recyclerView.getChildAdapterPosition(v)));
                }
            }
        });
        recyclerView.setAdapter(classificationAdapter);
        return view;
    }

    private void sendFriendRequest(final DataSnapshot receiverUser){
        if(Objects.requireNonNull(receiverUser.getKey()).equalsIgnoreCase(Objects.requireNonNull(FirebaseAuth.getInstance().getCurrentUser()).getUid())){
            DynamicToast.makeError(getContext(), "You can´t add yourself as friend", 10).show();
            return;
        }
        Query query = databaseReference.child("friends").child(FirebaseAuth.getInstance().getCurrentUser().getUid());
        query.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                    Boolean exits = false;
                    DataSnapshot data = dataSnapshot.child(FirebaseAuth.getInstance().getCurrentUser().getUid());
                    for (DataSnapshot id : dataSnapshot.getChildren()) {
                        if (id.child("id").getValue().toString().equalsIgnoreCase(receiverUser.getKey())) {
                            DynamicToast.makeWarning(getContext(), receiverUser.child("name").getValue() + " is already your friend", 10).show();
                            exits = true;
                        }
                    }
                    if (!exits) {
                        Query query = databaseReference.child("users").child(receiverUser.getKey());
                        query.addListenerForSingleValueEvent(new ValueEventListener() {
                            @Override
                            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                                if (dataSnapshot.exists()) {
                                    HashMap<String, String> friendRequest = new HashMap<>();
                                    friendRequest.put("id", receiverUser.getKey());
                                    friendRequest.put("name", dataSnapshot.child("name").getValue().toString());
                                    friendRequest.put("points", dataSnapshot.child("points").getValue().toString());
                                    databaseReference.child("friends").child(FirebaseAuth.getInstance().getUid()).push().setValue(friendRequest);
                                    DynamicToast.makeSuccess(getContext(), "You have added "
                                            + receiverUser.child("name").getValue() + " to your friend list", 10).show();
                                }
                            }
                            @Override
                            public void onCancelled(@NonNull DatabaseError databaseError) {

                            }
                        });
                    }

            }
            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });


    }

    @Override
    public void onResume() {
        super.onResume();
        Log.e("resume", "resume");

    }


}
