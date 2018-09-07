package com.pad.slaythespire;


import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;
import com.pranavpandey.android.dynamic.toasts.DynamicToast;

import java.util.ArrayList;


/**
 * A simple {@link Fragment} subclass.
 */
public class FriendFragment extends Fragment {


    RecyclerView recyclerView;

    FriendAdapter friendAdapter;
    ArrayList<String> emails;

    ArrayList<String> requests;

    FirebaseAuth firebaseAuth;

    public FriendFragment() {
        // Required empty public constructor
    }


    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        friendAdapter = new FriendAdapter();
        emails = new ArrayList<>();
        requests = new ArrayList<>();
        firebaseAuth = FirebaseAuth.getInstance();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        final View view = inflater.inflate(R.layout.fragment_friend, container, false);

        recyclerView = view.findViewById(R.id.recycle_view_friends);
        recyclerView.setLayoutManager(new GridLayoutManager(this.getActivity(), 1));

        final ArrayList<String> dataList = new ArrayList<>();
        for (int i=0; i<4; i++){
            dataList.add("Dato:" + i);
        }


        Query query = FirebaseDatabase.getInstance().getReference().child("friends").child(firebaseAuth.getUid());
        query.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                if (dataSnapshot.exists()) {
                    emails.clear();
                    for (DataSnapshot friends  : dataSnapshot.getChildren()) {
                        emails.add(friends.child("name").getValue().toString());
                    }


                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });



        /*friendRequestAdapter = new FriendRequestAdapter(requests);
        friendRequestAdapter.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getContext(), "Selected " +
                        requests.get(friendRequests.getChildAdapterPosition(v)), Toast.LENGTH_LONG).show();

                //startActivity(new Intent(getActivity(), FriendRequestActivity.class));

                AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(
                        getContext());

                // set title
                alertDialogBuilder.setTitle(friendRequests.getChildAdapterPosition(v) + "friend request");

                // set dialog message
                alertDialogBuilder
                        .setMessage("Click yes to accept the request or no to decline!")
                        .setCancelable(false)
                        .setPositiveButton("Yes",new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog,int id) {
                                // if this button is clicked, close
                                // current activity
                                //MainActivity.this.finish();

                            }
                        })
                        .setNegativeButton("No",new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog,int id) {
                                // if this button is clicked, just close
                                // the dialog box and do nothing
                                dialog.cancel();
                            }
                        });

                AlertDialog alertDialog = alertDialogBuilder.create();

                alertDialog.show();
            }
        });
        friendRequests.setAdapter(friendRequestAdapter);*/


        friendAdapter.setData(emails);
        friendAdapter.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });

        recyclerView.setAdapter(friendAdapter);

        return view;
    }


}
